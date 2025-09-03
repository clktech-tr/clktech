!macro customInstall
  SetOutPath "$INSTDIR\arduino_CH340"
  ${If} ${RunningX64}
    ExecWait '"$INSTDIR\arduino_CH340\DRVSETUP64\DRVSETUP64.exe" /SILENT'
  ${Else}
    ExecWait '"$INSTDIR\arduino_CH340\SETUP.EXE" /SILENT'
  ${EndIf}
!macroend 