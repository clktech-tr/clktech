const API_BASE_URL = import.meta.env.VITE_API_URL || '';

interface ApiResponse<T = any> {
  data?: T;
  error?: {
    message: string;
    code?: string | number;
    details?: any;
  };
  success: boolean;
}

async function handleResponse<T>(response: Response): Promise<T> {
  const contentType = response.headers.get('content-type');
  
  // Handle empty responses
  if (response.status === 204 || !contentType) {
    return null as unknown as T;
  }
  
  // Handle JSON responses
  if (contentType.includes('application/json')) {
    const data = await response.json();
    
    if (!response.ok) {
      const error = new Error(data.message || 'An error occurred') as Error & { status?: number };
      error.status = response.status;
      throw error;
    }
    
    return data;
  }
  
  // Handle text responses
  const text = await response.text();
  if (!response.ok) {
    const error = new Error(text || 'An error occurred') as Error & { status?: number };
    error.status = response.status;
    throw error;
  }
  
  return text as unknown as T;
}

export async function apiFetch<T = any>(
  endpoint: string, 
  options: RequestInit = {}
): Promise<T> {
  const token = localStorage.getItem('admin_token');
  const headers = new Headers(options.headers);
  
  // Set default headers if not already set
  if (!headers.has('Content-Type') && !(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }
  
  // Add auth token if available
  if (token && !headers.has('Authorization')) {
    headers.set('Authorization', `Bearer ${token}`);
  }
  
  // Construct the full URL
  const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint}`;
  
  try {
    const response = await fetch(url, {
      ...options,
      headers,
      credentials: 'include',
    });
    
    return await handleResponse<T>(response);
  } catch (error) {
    console.error('API Request Failed:', {
      endpoint,
      method: options.method || 'GET',
      error,
    });
    
    // Log client-side errors
    if (error instanceof Error) {
      try {
        await apiFetch('/api/log-client-error', {
          method: 'POST',
          body: JSON.stringify({
            message: error.message,
            stack: error.stack,
            url: window.location.href,
            timestamp: new Date().toISOString(),
          }),
        });
      } catch (logError) {
        console.error('Failed to log client error:', logError);
      }
    }
    
    throw error;
  }
}

// API client with typed methods
export const api = {
  get: <T = any>(endpoint: string, options: RequestInit = {}) => 
    apiFetch<T>(endpoint, { ...options, method: 'GET' }),
    
  post: <T = any>(endpoint: string, data?: any, options: RequestInit = {}) => 
    apiFetch<T>(endpoint, { 
      ...options,
      method: 'POST',
      body: data instanceof FormData ? data : JSON.stringify(data),
    }),
    
  put: <T = any>(endpoint: string, data?: any, options: RequestInit = {}) => 
    apiFetch<T>(endpoint, { 
      ...options,
      method: 'PUT',
      body: data instanceof FormData ? data : JSON.stringify(data),
    }),
    
  patch: <T = any>(endpoint: string, data?: any, options: RequestInit = {}) => 
    apiFetch<T>(endpoint, { 
      ...options,
      method: 'PATCH',
      body: data instanceof FormData ? data : JSON.stringify(data),
    }),
    
  delete: <T = any>(endpoint: string, options: RequestInit = {}) => 
    apiFetch<T>(endpoint, { ...options, method: 'DELETE' }),
    
  upload: <T = any>(
    endpoint: string, 
    formData: FormData, 
    onProgress?: (progress: number) => void
  ) => {
    return new Promise<T>((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      
      xhr.open('POST', endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint}`, true);
      
      // Set headers
      const token = localStorage.getItem('admin_token');
      if (token) {
        xhr.setRequestHeader('Authorization', `Bearer ${token}`);
      }
      
      // Track upload progress
      if (onProgress) {
        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            const progress = Math.round((event.loaded / event.total) * 100);
            onProgress(progress);
          }
        };
      }
      
      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const response = xhr.responseText ? JSON.parse(xhr.responseText) : null;
            resolve(response);
          } catch (error) {
            resolve(xhr.responseText as unknown as T);
          }
        } else {
          let error;
          try {
            const errorData = JSON.parse(xhr.responseText);
            error = new Error(errorData.message || 'Upload failed');
            Object.assign(error, errorData);
          } catch (e) {
            error = new Error(xhr.statusText || 'Upload failed');
          }
          (error as any).status = xhr.status;
          reject(error);
        }
      };
      
      xhr.onerror = () => {
        reject(new Error('Network error occurred during upload'));
      };
      
      xhr.send(formData);
    });
  },
};
