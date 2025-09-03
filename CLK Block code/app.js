const robotCardPinMappings = {
    'MazeX': {
        sensors: {
            'Ön Sensör': 'A0',
            'Sağ Çapraz Sensör': 'A1',
            'Sol Çapraz Sensör': 'A2',
            'Sağ Sensör': 'A3',
            'Sol Sensör': 'A4',
            'Zemin Sensör': 'A5',
            'Boş': 'A6',
            'Boş': 'A7'
        },
        digital: {
            'Dip Switch 1': 'D12',
            'Dip Switch 2': 'D2',
            'Start Butonu': 'D11',
            'Standby': 'D13'
        },
        motors: {
            'Sol Motor PWM': 'D3',
            'Sol Motor IN1': 'D4',
            'Sol Motor IN2': 'D5',
            'Sağ Motor PWM': 'D6',
            'Sağ Motor IN1': 'D7',
            'Sağ Motor IN2': 'D8'
        }
    },
    'LineX': {
        sensors: {
            'Çizgi Sensör 1': 'A0',
            'Çizgi Sensör 2': 'A1',
            'Çizgi Sensör 3': 'A2',
            'Çizgi Sensör 4': 'A3',
            'Çizgi Sensör 5': 'A4',
            'Çizgi Sensör 6': 'A5',
            'Çizgi Sensör 7': 'A6',
            'Çizgi Sensör 8': 'A7',
            'Ön Mesafe Sensörü': 'D10'
        },
        digital: {
            'Fan Çıkışı': 'D9',
            'Start Butonu': 'D11',
            'Dip Switch 1': 'D12',
            'Dip Switch 2': 'D2',
            'Boş': 'D0',
            'Boş': 'D1',
            'Standby': 'D13'
        },
        motors: {
            'Sol Motor PWM': 'D3',
            'Sol Motor IN1': 'D4',
            'Sol Motor IN2': 'D5',
            'Sağ Motor PWM': 'D6',
            'Sağ Motor IN1': 'D7',
            'Sağ Motor IN2': 'D8'
        }
    },
    'VivianX': {
        analogIO: {
            'Analog A0': 'A0',
            'Analog A1': 'A1',
            'Analog A2': 'A2',
            'Analog A3': 'A3',
            'Analog A4': 'A4',
            'Analog A5': 'A5',
            'Analog A6': 'A6',
            'Analog A7': 'A7'
        },
        digitalIO: {
            'Dijital D2': 'D2',
            'Dijital D3': 'D3',
            'Dijital D11': 'D11',
            'Dijital D12': 'D12'
        },
        motors: {
            'Sol Motor': { pwm1: 'D9', pwm2: 'D10' },
            'Sağ Motor': { pwm1: 'D5', pwm2: 'D6' }
        },
        peripherals: {
            'Bluetooth RX': 'RX',
            'Bluetooth TX': 'TX',
            'ESP01': 'ESP01',
            'NRF24': 'NRF24',
            'OLED SCL': 'SCL',
            'OLED SDA': 'SDA'
        }
    }
};

const robotCardToolboxes = {
    'MazeX': `<xml>
        <category name="Hareket" colour="#4A90E2">
            <block type="robot_ileri"></block>
            <block type="robot_geri"></block>
            <block type="robot_sol"></block>
            <block type="robot_sag"></block>
            <block type="robot_dur"></block>
            <block type="robot_hiz"></block>
            <block type="robot_standby"></block>
        </category>
        <category name="Giriş/Çıkış" colour="#50E3C2">
            <!-- <block type="read_sensor"></block> -->
            <block type="read_digital_pin"></block>
            <block type="write_digital_pin"></block>
            <block type="logic_high_low"></block>
            <!-- <block type="read_analog_pin"></block> -->
            <!--
            <block type="serial_println">
                <value name="TEXT">
                    <block type="read_sensor"></block>
                </value>
            </block>
            <block type="serial_println">
                <value name="TEXT">
                    <block type="read_analog_pin"></block>
                </value>
            </block>
            -->
            <block type="write_analog_pin"></block>
        </category>
        <category name="Seri Port" colour="#FFD700">
            <block type="serial_begin"></block>
            <block type="serial_print"></block>
            <block type="serial_println"></block>
            <!-- <block type="serial_read"></block> -->
            <!-- <block type="serial_available"></block> -->
        </category>
        <category name="Kontrol" colour="#F5A623">
            <block type="controls_if"></block>
            <block type="controls_if_else"></block>
            <block type="controls_repeat_ext"></block>
            <block type="controls_for"></block>
            <block type="controls_forever"></block>
            <block type="controls_repeat_until"></block>
            <block type="controls_flow_statements"></block>
        </category>
        <category name="İşlemler" colour="#7ED321">
            <block type="math_number"></block>
            <block type="operator_add"></block>
            <block type="operator_subtract"></block>
            <block type="operator_multiply"></block>
            <block type="operator_divide"></block>
            <block type="operator_random"></block>
            <block type="operator_gt"></block>
            <block type="operator_lt"></block>
            <block type="operator_equals"></block>
            <block type="operator_and"></block>
            <block type="operator_or"></block>
            <block type="operator_not"></block>
            <block type="math_map"></block>
            <block type="math_constrain"></block>
            <block type="math_abs"></block>
            <block type="math_min"></block>
            <block type="math_max"></block>
        </category>
        <category name="Değişkenler" colour="#9013FE">
            <block type="variables_make_a_variable"></block>
            <block type="variables_make_a_list"></block>
            <block type="variables_set_variable"></block>
            <block type="variables_change_variable_by"></block>
            <block type="variables_show_variable"></block>
        </category>
        <category name="Bloklarım" colour="#D0021B">
            <block type="procedures_definition"></block>
        </category>
    </xml>`,
    'LineX': `<xml>
        <category name="Hareket" colour="#4A90E2">
            <block type="robot_ileri"></block>
            <block type="robot_geri"></block>
            <block type="robot_sol"></block>
            <block type="robot_sag"></block>
            <block type="robot_dur"></block>
            <block type="robot_hiz"></block>
            <block type="robot_standby"></block>
        </category>
        <category name="Giriş/Çıkış" colour="#50E3C2">
            <!-- <block type="read_sensor"></block> -->
            <block type="read_digital_pin"></block>
            <block type="write_digital_pin"></block>
            <block type="logic_high_low"></block>
            <!-- <block type="read_analog_pin"></block> -->
            <!-- <block type="analog_write"></block> -->
            <!-- <block type="linex_fan_control"></block> -->
            <!--
            <block type="serial_println">
                <value name="TEXT">
                    <block type="read_sensor"></block>
                </value>
            </block>
            <block type="serial_println">
                <value name="TEXT">
                    <block type="read_analog_pin"></block>
                </value>
            </block>
            -->
        </category>
        <category name="Seri Port" colour="#FFD700">
            <block type="serial_begin"></block>
            <block type="serial_print"></block>
            <block type="serial_println"></block>
            <!-- <block type="serial_read"></block> -->
            <!-- <block type="serial_available"></block> -->
        </category>
        <category name="Kontrol" colour="#F5A623">
            <block type="controls_if"></block>
            <block type="controls_if_else"></block>
            <block type="controls_repeat_ext"></block>
            <block type="controls_for"></block>
            <block type="controls_forever"></block>
            <block type="controls_repeat_until"></block>
            <block type="controls_flow_statements"></block>
        </category>
        <category name="İşlemler" colour="#7ED321">
            <block type="math_number"></block>
            <block type="operator_add"></block>
            <block type="operator_subtract"></block>
            <block type="operator_multiply"></block>
            <block type="operator_divide"></block>
            <block type="operator_random"></block>
            <block type="operator_gt"></block>
            <block type="operator_lt"></block>
            <block type="operator_equals"></block>
            <block type="operator_and"></block>
            <block type="operator_or"></block>
            <block type="operator_not"></block>
            <block type="math_map"></block>
            <block type="math_constrain"></block>
            <block type="math_abs"></block>
            <block type="math_min"></block>
            <block type="math_max"></block>
        </category>
        <category name="Değişkenler" colour="#9013FE">
            <block type="variables_make_a_variable"></block>
            <block type="variables_make_a_list"></block>
            <block type="variables_set_variable"></block>
            <block type="variables_change_variable_by"></block>
            <block type="variables_show_variable"></block>
        </category>
        <category name="Bloklarım" colour="#D0021B">
            <block type="procedures_definition"></block>
        </category>
    </xml>`,
    'VivianX': `<xml>
        <category name="Hareket" colour="#4A90E2">
            <block type="robot_ileri"></block>
            <block type="robot_geri"></block>
            <block type="robot_sol"></block>
            <block type="robot_sag"></block>
            <block type="robot_dur"></block>
            <block type="robot_hiz"></block>
            <block type="robot_standby"></block>
        </category>
        <category name="Giriş/Çıkış" colour="#50E3C2">
            <block type="read_digital_pin"></block>
            <block type="write_digital_pin"></block>
            <block type="logic_high_low"></block>
            <!-- <block type="read_analog_pin"></block> -->
            <block type="write_analog_pin"></block>
            <!--
            <block type="serial_println">
                <value name="TEXT">
                    <block type="read_digital_pin"></block>
                </value>
            </block>
            <block type="serial_println">
                <value name="TEXT">
                    <block type="read_analog_pin"></block>
                </value>
            </block>
            -->
        </category>
        <category name="Seri Port" colour="#FFD700">
            <block type="serial_begin"></block>
            <block type="serial_print"></block>
            <block type="serial_println"></block>
            <!-- <block type="serial_read"></block> -->
            <!-- <block type="serial_available"></block> -->
        </category>
        <category name="Kontrol" colour="#F5A623">
            <block type="controls_if"></block>
            <block type="controls_if_else"></block>
            <block type="controls_repeat_ext"></block>
            <block type="controls_for"></block>
            <block type="controls_forever"></block>
            <block type="controls_repeat_until"></block>
            <block type="controls_flow_statements"></block>
        </category>
        <category name="İşlemler" colour="#7ED321">
            <block type="math_number"></block>
            <block type="operator_add"></block>
            <block type="operator_subtract"></block>
            <block type="operator_multiply"></block>
            <block type="operator_divide"></block>
            <block type="operator_random"></block>
            <block type="operator_gt"></block>
            <block type="operator_lt"></block>
            <block type="operator_equals"></block>
            <block type="operator_and"></block>
            <block type="operator_or"></block>
            <block type="operator_not"></block>
            <block type="math_map"></block>
            <block type="math_constrain"></block>
            <block type="math_abs"></block>
            <block type="math_min"></block>
            <block type="math_max"></block>
        </category>
        <category name="Değişkenler" colour="#9013FE">
            <block type="variables_make_a_variable"></block>
            <block type="variables_make_a_list"></block>
            <block type="variables_set_variable"></block>
            <block type="variables_change_variable_by"></block>
            <block type="variables_show_variable"></block>
        </category>
        <category name="Bloklarım" colour="#D0021B">
            <block type="procedures_definition"></block>
        </category>
        <category name="Çevre Birimleri" colour="#E64C4C">
            <block type="bluetooth_send_data"></block>
            <block type="oled_print_text"></block>
            <block type="nrf24_init"></block>
            <block type="nrf24_set_channel"></block>
            <block type="nrf24_set_power"></block>
            <block type="nrf24_send_data"></block>
            <block type="esp01_test"></block>
            <block type="esp01_set_mode"></block>
            <block type="esp01_wifi_setup"></block>
            <block type="esp01_tcp_setup"></block>
            <block type="esp01_check_connection"></block>
            <block type="esp01_send_data"></block>
        </category>
        <category name="Ses" colour="#00B3E6">
            <block type="vivianx_buzzer_play"></block>
        </category>
    </xml>`
};

// Pin tanımlamaları
const PINS = {
    A0: 'A0',
    A1: 'A1',
    A2: 'A2',
    A3: 'A3',
    A4: 'A4',
    A5: 'A5',
    A6: 'A6',
    A7: 'A7',
    D0: 'D0',
    D1: 'D1',
    D2: 'D2',
    D3: 'D3',
    D4: 'D4',
    D5: 'D5',
    D6: 'D6',
    D7: 'D7',
    D8: 'D8',
    D9: 'D9',
    D10: 'D10',
    D11: 'D11',
    D12: 'D12',
    D13: 'D13'
};

// Temel bloklar
const blocks = [{
        type: 'controls_if',
        message0: 'eğer %1',
        args0: [{
            type: 'input_value',
            name: 'IF0',
            check: 'Boolean'
        }],
        previousStatement: null,
        nextStatement: null,
        colour: 210,
        tooltip: 'Eğer koşul doğruysa içindeki blokları çalıştırır'
    },
    {
        type: 'controls_repeat_ext',
        message0: '%1 kez tekrarla',
        args0: [{
            type: 'input_value',
            name: 'TIMES',
            check: 'Number'
        }],
        previousStatement: null,
        nextStatement: null,
        colour: 120,
        tooltip: 'Belirtilen sayı kadar tekrarlar'
    },
    {
        type: 'math_number',
        message0: '%1',
        args0: [{
            type: 'field_number',
            name: 'NUM',
            value: 0
        }],
        output: 'Number',
        colour: 230,
        tooltip: 'Sayı değeri'
    },
    {
        type: 'logic_compare',
        message0: '%1 %2 %3',
        args0: [{
                type: 'input_value',
                name: 'A',
                check: 'Number'
            },
            {
                type: 'field_dropdown',
                name: 'OP',
                options: [
                    ['=', 'EQ'],
                    ['≠', 'NEQ'],
                    ['<', 'LT'],
                    ['≤', 'LTE'],
                    ['>', 'GT'],
                    ['≥', 'GTE']
                ]
            },
            {
                type: 'input_value',
                name: 'B',
                check: 'Number'
            }
        ],
        output: 'Boolean',
        colour: 210,
        tooltip: 'İki değeri karşılaştırır'
    },
    {
        type: 'math_arithmetic',
        message0: '%1 %2 %3',
        args0: [{
                type: 'input_value',
                name: 'A',
                check: 'Number'
            },
            {
                type: 'field_dropdown',
                name: 'OP',
                options: [
                    ['+', 'ADD'],
                    ['-', 'MINUS'],
                    ['×', 'MULTIPLY'],
                    ['÷', 'DIVIDE']
                ]
            },
            {
                type: 'input_value',
                name: 'B',
                check: 'Number'
            }
        ],
        output: 'Number',
        colour: 230,
        tooltip: 'Matematiksel işlem yapar'
    },
    {
        type: 'text',
        message0: '%1',
        args0: [{
            type: 'field_input',
            name: 'TEXT',
            text: 'metin'
        }],
        output: 'String',
        colour: 160,
        tooltip: 'Metin değeri'
    },
    {
        type: 'variables_get',
        message0: '%1',
        args0: [{
            type: 'field_variable',
            name: 'VAR',
            variable: 'değişken'
        }],
        output: null,
        colour: 330,
        tooltip: 'Değişken değerini alır'
    },
    {
        type: 'variables_set',
        message0: '%1 = %2',
        args0: [{
                type: 'field_variable',
                name: 'VAR',
                variable: 'değişken'
            },
            {
                type: 'input_value',
                name: 'VALUE'
            }
        ],
        previousStatement: null,
        nextStatement: null,
        colour: 330,
        tooltip: 'Değişkene değer atar'
    }
];

Blockly.common.defineBlocks(blocks);

// Blok tanımları ve JavaScript üreticileri
Blockly.JavaScript.forBlock = Blockly.JavaScript.forBlock || {};
Blockly.JavaScript.forBlock['robot_ileri'] = function(block) {
    const robotType = selectedRobot;
    const pinMappings = robotCardPinMappings[robotType];
    if (robotType === 'MazeX' || robotType === 'LineX') {
        return `robotIleri();\n`;
    } else if (robotType === 'VivianX') {
        return `robotIleri();\n`;
    }
    return '';
};

Blockly.JavaScript.forBlock['robot_geri'] = function(block) {
    const robotType = selectedRobot;
    const pinMappings = robotCardPinMappings[robotType];
    if (robotType === 'MazeX' || robotType === 'LineX') {
        return `robotGeri();\n`;
    } else if (robotType === 'VivianX') {
        return `robotGeri();\n`;
    }
    return '';
};

Blockly.JavaScript.forBlock['robot_sol'] = function(block) {
    const robotType = selectedRobot;
    const pinMappings = robotCardPinMappings[robotType];
    if (robotType === 'MazeX' || robotType === 'LineX') {
        return `robotSol();\n`;
    } else if (robotType === 'VivianX') {
        return `robotSol();\n`;
    }
    return '';
};

Blockly.JavaScript.forBlock['robot_sag'] = function(block) {
    const robotType = selectedRobot;
    const pinMappings = robotCardPinMappings[robotType];
    if (robotType === 'MazeX' || robotType === 'LineX') {
        return `robotSag();\n`;
    } else if (robotType === 'VivianX') {
        return `robotSag();\n`;
    }
    return '';
};

Blockly.JavaScript.forBlock['robot_dur'] = function(block) {
    const robotType = selectedRobot;
    const pinMappings = robotCardPinMappings[robotType];
    if (robotType === 'MazeX' || robotType === 'LineX') {
        const standbyPin = pinMappings.digital['Standby'];
        return `robotDur();\n`;
    } else if (robotType === 'VivianX') {
        return `robotDur();\n`;
    }
    return '';
};

Blockly.JavaScript.forBlock['robot_hiz'] = function(block) {
    const hiz = Blockly.JavaScript.valueToCode(block, 'HIZ', Blockly.JavaScript.ORDER_NONE) || '0';
    return `robotHiz(${hiz});\n`;
};

Blockly.JavaScript.forBlock['robot_bekle'] = function(block) {
    const sure = block.getFieldValue('SÜRE');
    return `robotBekle(${sure});\n`;
};

Blockly.JavaScript.forBlock['read_sensor'] = function(block) {
    const robotType = selectedRobot;
    const sensorName = block.getFieldValue('SENSOR_TYPE');
    let pin = null;
    if (robotType && robotCardPinMappings[robotType] && robotCardPinMappings[robotType].sensors) {
        pin = robotCardPinMappings[robotType].sensors[sensorName];
    }
    if (!pin) {
        console.warn(`Pin mapping not found for sensor: ${sensorName} on robot: ${robotType}`);
        return ['0', Blockly.JavaScript.ORDER_ATOMIC];
    }
    return [`analogRead(${pin})`, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

// getDigitalInputPinOptions fonksiyonunu güncelle
function getDigitalInputPinOptions() {
    const robotType = selectedRobot || 'MazeX';
    const pinMappings = robotCardPinMappings[robotType];
    let inputPins = [];
    if (robotType === 'MazeX' || robotType === 'LineX') {
        inputPins = [
            ...Object.entries(pinMappings.sensors || {}).filter(([name, pin]) => name !== 'Boş' && pin !== 'A6' && pin !== 'A7'),
            ...Object.entries(pinMappings.digital || {}).filter(([name]) => name === 'Start Butonu' || name.startsWith('Dip Switch')),
            ...Object.entries(pinMappings.sensors || {}).filter(([name, pin]) => name === 'Boş' && pin !== 'A6' && pin !== 'A7').map(([_, pin]) => [pin, pin]),
            ...Object.entries(pinMappings.digital || {}).filter(([name]) => name === 'Boş').map(([_, pin]) => [pin, pin]),
            // D8, D4, D7 pinlerini manuel ekle
            ['D8', 'D8'],
            ['D4', 'D4'],
            ['D7', 'D7']
        ];
        // MazeX için sensör isimlerini kısaltmasız göster
        if (robotType === 'MazeX') {
            return inputPins.map(([name, pin]) => {
                let displayName = name
                    .replace(/^Sg Sensör$/, 'Sağ Sensör')
                    .replace(/^Sl Sensör$/, 'Sol Sensör')
                    .replace(/^Sg Çapraz Sensör$/, 'Sağ Çapraz Sensör')
                    .replace(/^Sl Çapraz Sensör$/, 'Sol Çapraz Sensör');
                return [displayName, pin];
            });
        }
        return inputPins.map(([name, pin]) => [simplifyPinName(name), pin]);
    }
    // VivianX için tabloya göre özel pin listesi
    return [
        ['D2 (NRF)', 'D2'],
        ['D3 (NRF)', 'D3'],
        ['D11', 'D11'],
        ['D12', 'D12'],
        ['A0', 'A0'],
        ['A1', 'A1'],
        ['A2', 'A2'],
        ['A3', 'A3'],
        ['A4', 'A4'],
        ['A5', 'A5'],
        ['D0', 'D0'],
        ['D1', 'D1'],
        ['Start Butonu', 'D8'],
        ['Dip Switch 1', 'D4'],
        ['Dip Switch 2', 'D7']
    ];
}

// getDigitalOutputPinOptions fonksiyonunu güncelle
function getDigitalOutputPinOptions() {
    const robotType = selectedRobot || 'MazeX';
    const pinMappings = robotCardPinMappings[robotType];
    let outputPins = [];
    if (robotType === 'MazeX' || robotType === 'LineX') {
        outputPins = [
            ...Object.entries(pinMappings.digital || {}).filter(([name]) => name === 'Fan Çıkışı' || name.startsWith('Yedek Çıkış')),
            ...Object.entries(pinMappings.sensors || {}).filter(([name, pin]) => name === 'Boş' && pin !== 'A6' && pin !== 'A7').map(([_, pin]) => [pin, pin]),
            ...Object.entries(pinMappings.digital || {}).filter(([name]) => name === 'Boş').map(([_, pin]) => [pin, pin])
        ];
        // Eğer hiç pin yoksa, D9'u ekle
        if (outputPins.length === 0) {
            outputPins.push(['D9', 'D9']);
        }
    } else if (robotType === 'VivianX') {
        outputPins = [
            ...Object.entries(pinMappings.analogIO || {}),
            ...Object.entries(pinMappings.digitalIO || {}), ['D0', 'D0'],
            ['D1', 'D1']
        ];
    }
    return outputPins.map(([name, pin]) => [simplifyPinName(name), pin]);
}

// Pin label'dan Arduino sabit ismine çeviren fonksiyon
function getPinConstantFromLabel(label, robotType) {
    if (!robotType) return label;
    // VivianX için özel eşleştirme
    if (robotType === 'VivianX') {
        // Label'ı normalize et
        const map = {
            'Start Butonu': 'START_BUTONU',
            'Dip Switch 1': 'DIP_SWITCH_1',
            'Dip Switch 2': 'DIP_SWITCH_2',
            'Buzzer': 'BUZZER',
            'BUZZER': 'BUZZER',
            'Buzzer (D13)': 'BUZZER',
            'D13': 'BUZZER'
        };
        if (map[label]) return map[label];
        // Diğer pinler için Türkçe karakterleri kaldırıp büyük harfe çevir
        return replaceTurkishChars(label).replace(/ /g, '_').toUpperCase();
    }
    const pinMappings = robotCardPinMappings[robotType];
    // Sensörler
    if (pinMappings.sensors) {
        for (const [name, pin] of Object.entries(pinMappings.sensors)) {
            if (simplifyPinName(name) === label) {
                return replaceTurkishChars(name).replace(/ /g, '_').toUpperCase();
            }
        }
    }
    // Dijital pinler
    if (pinMappings.digital) {
        for (const [name, pin] of Object.entries(pinMappings.digital)) {
            if (simplifyPinName(name) === label) {
                return replaceTurkishChars(name).replace(/ /g, '_').toUpperCase();
            }
        }
    }
    // Analog/dijital IO (VivianX)
    if (pinMappings.analogIO) {
        for (const [name, pin] of Object.entries(pinMappings.analogIO)) {
            if (simplifyPinName(name) === label) {
                return replaceTurkishChars(name).replace(/ /g, '_').toUpperCase();
            }
        }
    }
    if (pinMappings.digitalIO) {
        for (const [name, pin] of Object.entries(pinMappings.digitalIO)) {
            if (simplifyPinName(name) === label) {
                return replaceTurkishChars(name).replace(/ /g, '_').toUpperCase();
            }
        }
    }
    // Hiçbiri eşleşmezse label'ın kendisini döndür
    return label;
}

Blockly.JavaScript.forBlock['read_digital_pin'] = function(block) {
    const robotType = selectedRobot;
    let pinLabel = block.getFieldValue('PIN');
    const pinConst = getPinConstantFromLabel(pinLabel, robotType);
    return [`digitalRead(${pinConst})`, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript.forBlock['read_analog_pin'] = function(block) {
    const pinLabel = block.getFieldValue('PIN');
    const robotType = selectedRobot;
    const pinConst = getPinConstantFromLabel(pinLabel, robotType);
    return [`analogRead(${pinConst})`, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript.forBlock['digital_write'] = function(block) {
    var pin = Blockly.JavaScript.valueToCode(block, 'PIN', Blockly.JavaScript.ORDER_NONE) || '0';
    var value = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_NONE) || '0';
    return `digitalWrite(${pin}, ${value});\n`;
};

Blockly.JavaScript.forBlock['serial_print'] = function(block) {
    const text = Blockly.JavaScript.valueToCode(block, 'TEXT', Blockly.JavaScript.ORDER_NONE) || '""';
    return `Serial.print(${text});\n`;
};

Blockly.JavaScript.forBlock['serial_println'] = function(block) {
    const text = Blockly.JavaScript.valueToCode(block, 'TEXT', Blockly.JavaScript.ORDER_NONE) || '""';
    return `Serial.println(${text});\n`;
};

Blockly.JavaScript.forBlock['controls_if'] = function(block) {
    let condition = 'false';
    const condBlock = block.getInputTargetBlock('IF0');
    if (condBlock) condition = Blockly.JavaScript.valueToCode(block, 'IF0', Blockly.JavaScript.ORDER_NONE);
    const statements = Blockly.JavaScript.statementToCode(block, 'DO0');
    return `if (${condition}) {\n${statements}}\n`;
};

Blockly.JavaScript.forBlock['controls_if_else'] = function(block) {
    let condition = 'false';
    const condBlock = block.getInputTargetBlock('IF0');
    if (condBlock) condition = Blockly.JavaScript.valueToCode(block, 'IF0', Blockly.JavaScript.ORDER_NONE);
    const statements = Blockly.JavaScript.statementToCode(block, 'DO0');
    const elseStatements = Blockly.JavaScript.statementToCode(block, 'ELSE');
    return `if (${condition}) {\n${statements}} else {\n${elseStatements}}\n`;
};

Blockly.JavaScript.forBlock['controls_repeat_ext'] = function(block) {
    const times = Blockly.JavaScript.valueToCode(block, 'TIMES', Blockly.JavaScript.ORDER_NONE) || '0';
    const statements = Blockly.JavaScript.statementToCode(block, 'DO') || '';
    return `for (int i = 0; i < ${times}; i++) {\n${statements}}\n`;
};

Blockly.JavaScript.forBlock['controls_forever'] = function(block) {
    const statements = Blockly.JavaScript.statementToCode(block, 'DO') || '';
    return `while (true) {\n${statements}}\n`;
};

Blockly.JavaScript.forBlock['controls_repeat_until'] = function(block) {
    const condition = Blockly.JavaScript.valueToCode(block, 'CONDITION', Blockly.JavaScript.ORDER_NONE) || 'false';
    const statements = Blockly.JavaScript.statementToCode(block, 'DO') || '';
    return `while (!(${condition})) {\n${statements}}\n`;
};

Blockly.JavaScript.forBlock['controls_flow_statements'] = function(block) {
    const mode = block.getFieldValue('MODE');
    if (mode === 'BREAK') {
        return 'break;\n';
    } else if (mode === 'CONTINUE') {
        return 'continue;\n';
    }
    return '';
};

Blockly.JavaScript.forBlock['controls_for'] = function(block) {
    const variable0 = block.getFieldValue('VAR'); // Doğrudan değişken adını al
    const argument0 = Blockly.JavaScript.valueToCode(block, 'FROM',
        Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
    const argument1 = Blockly.JavaScript.valueToCode(block, 'TO',
        Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
    const argument2 = Blockly.JavaScript.valueToCode(block, 'BY',
        Blockly.JavaScript.ORDER_ASSIGNMENT) || '1';

    let code = '';
    const up = parseFloat(argument0) <= parseFloat(argument1);
    code += `for (int ${variable0} = ${argument0}; ` +
        `${variable0} ${up ? '<=' : '>='} ${argument1}; ` +
        `${variable0} ${up ? '+' : '-'}= ${argument2}) {\n`;
    code += Blockly.JavaScript.statementToCode(block, 'DO') || '';
    code += `}\n`;
    return code;
};

Blockly.JavaScript.forBlock['controls_stop'] = function(block) {
    return 'break;\n';
};

Blockly.JavaScript.forBlock['math_number'] = function(block) {
    const number = Number(block.getFieldValue('NUM'));
    return [number, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.forBlock['logic_compare'] = function(block) {
    const operators = {
        'EQ': '==',
        'NEQ': '!=',
        'LT': '<',
        'LTE': '<=',
        'GT': '>',
        'GTE': '>='
    };
    const operator = operators[block.getFieldValue('OP')];
    const a = Blockly.JavaScript.valueToCode(block, 'A', Blockly.JavaScript.ORDER_RELATIONAL) || '0';
    const b = Blockly.JavaScript.valueToCode(block, 'B', Blockly.JavaScript.ORDER_RELATIONAL) || '0';
    return [`${a} ${operator} ${b}`, Blockly.JavaScript.ORDER_RELATIONAL];
};

Blockly.JavaScript.forBlock['math_arithmetic'] = function(block) {
    const operators = {
        'ADD': ['+', Blockly.JavaScript.ORDER_ADDITION],
        'MINUS': ['-', Blockly.JavaScript.ORDER_SUBTRACTION],
        'MULTIPLY': ['*', Blockly.JavaScript.ORDER_MULTIPLICATION],
        'DIVIDE': ['/', Blockly.JavaScript.ORDER_DIVISION]
    };
    const operator = operators[block.getFieldValue('OP')];
    const a = Blockly.JavaScript.valueToCode(block, 'A', operator[1]) || '0';
    const b = Blockly.JavaScript.valueToCode(block, 'B', operator[1]) || '0';
    return [`${a} ${operator[0]} ${b}`, operator[1]];
};

Blockly.JavaScript.forBlock['text'] = function(block) {
    const text = block.getFieldValue('TEXT');
    return [`"${text}"`, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.forBlock['variables_get'] = function(block) {
    const variable = block.getFieldValue('VAR');
    const sanitizedVarName = replaceTurkishChars(variable).replace(/ /g, '_');
    return [sanitizedVarName, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.forBlock['variables_set'] = function(block) {
    // Artık kod üretmiyor, tanım generateCode içinde yapılıyor.
    return '';
};

// Global değişkenler
let workspace = null;
let selectedRobot = null; // Varsayılan olarak hiçbir robot seçili değil
let port = null;
let reader = null;
let writer = null;
let isPortConnected = false; // Port bağlantı durumunu tutar
// Seçilen port bilgisini globalde sakla
let selectedPortName = null;
// Serial Monitor için WebSerial bağlantı yönetimi değişkenleri
let serialPort = null;
let serialReader = null;
let serialMonitorActive = false;
let uploadStatusTimeout = null; // Yükleme durumu mesajı için zamanlayıcı

// Yardımcı fonksiyon: Türkçe karakterleri İngilizce'ye çevir
function replaceTurkishChars(str) {
    return str
        .replace(/Ç/g, 'C').replace(/ç/g, 'c')
        .replace(/Ğ/g, 'G').replace(/ğ/g, 'g')
        .replace(/İ/g, 'I').replace(/ı/g, 'i')
        .replace(/Ö/g, 'O').replace(/ö/g, 'o')
        .replace(/Ş/g, 'S').replace(/ş/g, 's')
        .replace(/Ü/g, 'U').replace(/ü/g, 'u');
}
// Yardımcı fonksiyon: D10, D11 gibi pinleri düzelt (sadece sayısal kısmı döndür)
function fixPinNames(str) {
    // Eğer string 'D' ile başlıyorsa 'D'yi kaldır, 'A' ile başlıyorsa olduğu gibi bırak
    if (typeof str === 'string' && str.startsWith('D')) {
        return str.substring(1);
    }
    return str; // Diğer durumlarda (örn: A0, A1 veya zaten sayı) olduğu gibi bırak
}

// Blockly çalışma alanını başlat
function startBlockly() {
    const ws = Blockly.inject('blocklyDiv', {
        toolbox: robotCardToolboxes['MazeX'],
        grid: {
            spacing: 20,
            length: 3,
            colour: '#ccc',
            snap: true
        },
        zoom: {
            controls: true,
            wheel: true,
            startScale: 1.0,
            maxScale: 3,
            minScale: 0.3,
            scaleSpeed: 1.2
        },
        trashcan: true,
        scrollbars: true,
        move: {
            drag: true,
            wheel: false
        },
        theme: {
            'componentStyles': {
                'workspaceBackgroundColour': '#EEEEEE',
                'toolboxBackgroundColour': '#F8F8F8',
                'toolboxForegroundColour': '#000',
                'flyoutBackgroundColour': '#F0F0F0',
                'flyoutForegroundColour': '#000',
                'flyoutOpacity': 1,
                'scrollbarColour': '#A0A0A0',
                'insertionMarkerColour': '#fff',
                'insertionMarkerOpacity': 0.3,
                'scrollbarOpacity': 0.4,
                'cursorColour': '#000',
                'blackBackground': '#333'
            }
        }
    });

    ws.addChangeListener(function(event) {
        // if (event.type == Blockly.Events.FINISHED_LOAD) {
        //     generateCode();
        // }
        // Robot kartı seçilmeden blok eklenmesin
        if (event.type === Blockly.Events.BLOCK_CREATE && !selectedRobot) {
            // Eklenen blokları sil
            event.ids.forEach(function(id) {
                const block = ws.getBlockById(id);
                if (block) block.dispose(false, true);
            });
            showAlert('Uyarı', 'Lütfen önce bir robot kartı seçin!');
        }
    });

    return ws;
}

// Araç kutusunu güncelle
function updateToolbox(robotType) {
    if (workspace) {
        workspace.updateToolbox(robotCardToolboxes[robotType]);
        // Artık blokları burada yeniden oluşturmuyoruz.
        // Blockly, FieldDropdown'ların dinamik fonksiyonlarını çağırdığında
        // `selectedRobot` değeri güncel olmalı.
    }
}

// Robot görselini güncelle
function updateRobotImage(robotType) {
    const robotImage = document.getElementById('robotCardImage');
    if (robotImage) {
        if (robotType && typeof robotType === 'string') { // Eğer robotType tanımlı ve string ise resmi göster
            robotImage.src = `images/${robotType.toLowerCase()}.png`;
            robotImage.style.display = 'block';
        } else { // RobotType null, undefined veya string değilse resmi gizle
            robotImage.style.display = 'none'; // Resmi gizle
            robotImage.src = ''; // Kırık resim ikonunu önlemek için src'yi temizle
        }
    }
}

// Kod üretme fonksiyonu
function generateCode() {
    if (!workspace) return '';

    // Blockly generator başlat
    if (Blockly.JavaScript && Blockly.JavaScript.init) {
        Blockly.JavaScript.init(workspace);
    }

    if (!selectedRobot) {
        showAlert('Uyarı', 'Lütfen önce bir robot kartı seçin.');
        return ''; // Kod oluşturmayı durdur
    }

    const robotType = selectedRobot;
    const pinMappings = robotCardPinMappings[robotType];

    // Arduino başlık kısmı
    let code = `// ${robotType} Robot Kodu\n// Oluşturulma Tarihi: ${new Date().toLocaleString()}\n\n`;

    const oledBlocks = workspace.getBlocksByType('oled_print_text', false);
    if (oledBlocks.length > 0) {
        code += `#include <Wire.h>\n`;
        code += `#include <Adafruit_GFX.h>\n`;
        code += `#include <Adafruit_SSD1306.h>\n\n`;
        code += `#define SCREEN_WIDTH 128\n`;
        code += `#define SCREEN_HEIGHT 64\n`;
        code += `Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, -1);\n\n`;
    }

    // --- DEĞİŞKEN TANIMLAMALARI ---
    // variable_create ve variable_set_typed bloklarından gelen değişken tanımlarını globalde topla
    const allBlocks = workspace.getAllBlocks(false);
    const globalVarLines = [];
    const assignedVars = new Set();
    allBlocks.forEach(block => {
        if (block.type === 'variable_create') {
            const varName = replaceTurkishChars(block.getFieldValue('VARNAME')).replace(/ /g, '_');
            globalVarLines.push(`int ${varName} = 0;`);
            assignedVars.add(varName);
        }
        if (block.type === 'variable_set_typed') {
            let varName = Blockly.JavaScript.valueToCode(block, 'VARNAME', Blockly.JavaScript.ORDER_ATOMIC);
            if (varName && varName.startsWith('"') && varName.endsWith('"')) {
                varName = varName.slice(1, -1);
            }
            varName = replaceTurkishChars(varName).replace(/ /g, '_');
            const typeMap = { 'char': 'char', 'number': 'int', 'string': 'String', 'unsigned_long': 'unsigned long', 'bool': 'bool' };
            const type = typeMap[block.getFieldValue('TYPE')] || 'int';
            let initialValue = '0';
            // VALUE inputunu al
            let valueCode = '';
            const valueBlock = block.getInputTargetBlock('VALUE');
            if (valueBlock) {
                valueCode = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_ATOMIC);
                if (type === 'String') {
                    // Metin bloğu ise çift tırnaklı olmalı
                    if (valueCode && !/^".*"$/.test(valueCode)) {
                        valueCode = '""';
                    }
                    initialValue = valueCode;
                } else if (type === 'char') {
                    // Metin bloğu ise ilk karakteri tek tırnaklı al
                    if (valueCode && /^".*"$/.test(valueCode) && valueCode.length >= 3) {
                        initialValue = `'${valueCode[1]}'`;
                    } else {
                        initialValue = "''";
                    }
                } else if (type === 'bool') {
                    if (valueCode === 'true' || valueCode === 'false') {
                        initialValue = valueCode;
                    } else {
                        initialValue = 'false';
                    }
                } else {
                    // int veya unsigned long için sayı bloğu
                    if (valueCode && /^-?\d+$/.test(valueCode)) {
                        initialValue = valueCode;
                    } else {
                        initialValue = '0';
                    }
                }
            } else {
                if (type === 'String') initialValue = '""';
                else if (type === 'char') initialValue = "''";
                else if (type === 'bool') initialValue = 'false';
                else initialValue = '0';
            }
            if (!assignedVars.has(varName)) {
                globalVarLines.push(`${type} ${varName} = ${initialValue};`);
                assignedVars.add(varName);
            }
        }
    });
    if (globalVarLines.length > 0) {
        code += `// Değişken tanımlamaları\n`;
        code += globalVarLines.join('\n') + '\n\n';
    }

    // Pin tanımlamaları
    code += `// Pin tanımlamaları\n`;
    if (robotType === 'VivianX') {
        // Sadece Start Butonu, Dip Switch 1 ve Dip Switch 2 için tanım ekle
        code += `const int START_BUTONU = 8;\n`;
        code += `const int DIP_SWITCH_1 = 4;\n`;
        code += `const int DIP_SWITCH_2 = 7;\n`;
        code += `const int BUZZER = 13;\n`;
    } else {
        if (pinMappings.sensors) {
            for (const key in pinMappings.sensors) {
                if (key !== 'Boş') {
                    code += `const int ${replaceTurkishChars(key).replace(/ /g, '_').toUpperCase()} = ${fixPinNames(pinMappings.sensors[key])};\n`;
                }
            }
        }
        if (pinMappings.digital) {
            for (const key in pinMappings.digital) {
                if (key !== 'Boş') {
                    code += `const int ${replaceTurkishChars(key).replace(/ /g, '_').toUpperCase()} = ${fixPinNames(pinMappings.digital[key])};\n`;
                }
            }
        }
        if (pinMappings.digitalIO) { // VivianX için
            for (const key in pinMappings.digitalIO) {
                if (key !== 'Boş') {
                    code += `const int ${replaceTurkishChars(key).replace(/ /g, '_').toUpperCase()} = ${fixPinNames(pinMappings.digitalIO[key])};\n`;
                }
            }
        }
        if (pinMappings.analogIO) { // VivianX için
            for (const key in pinMappings.analogIO) {
                if (key !== 'Boş') {
                    code += `const int ${replaceTurkishChars(key).replace(/ /g, '_').toUpperCase()} = ${fixPinNames(pinMappings.analogIO[key])};\n`;
                }
            }
        }
    }

    // Motor fonksiyonları (robot tipine göre özelleştirildi)
    code += `\n// Robot hareket fonksiyonları\n`;
    if (robotType === 'MazeX') {
        code += `
// MazeX motor pin sabitleri
const int SOL_MOTOR_PWM = 3;
const int SOL_MOTOR_IN1 = 4;
const int SOL_MOTOR_IN2 = 5;
const int SAG_MOTOR_PWM = 6;
const int SAG_MOTOR_IN1 = 7;
const int SAG_MOTOR_IN2 = 8;

void robotIleri(int hiz = 255) {
    digitalWrite(SOL_MOTOR_IN1, HIGH);
    digitalWrite(SOL_MOTOR_IN2, LOW);
    digitalWrite(SAG_MOTOR_IN1, HIGH);
    digitalWrite(SAG_MOTOR_IN2, LOW);
    analogWrite(SOL_MOTOR_PWM, hiz);
    analogWrite(SAG_MOTOR_PWM, hiz);
}

void robotGeri(int hiz = 255) {
    digitalWrite(SOL_MOTOR_IN1, LOW);
    digitalWrite(SOL_MOTOR_IN2, HIGH);
    digitalWrite(SAG_MOTOR_IN1, LOW);
    digitalWrite(SAG_MOTOR_IN2, HIGH);
    analogWrite(SOL_MOTOR_PWM, hiz);
    analogWrite(SAG_MOTOR_PWM, hiz);
}

void robotSol(int hiz = 255) {
    digitalWrite(SOL_MOTOR_IN1, LOW);
    digitalWrite(SOL_MOTOR_IN2, HIGH);
    digitalWrite(SAG_MOTOR_IN1, HIGH);
    digitalWrite(SAG_MOTOR_IN2, LOW);
    analogWrite(SOL_MOTOR_PWM, hiz);
    analogWrite(SAG_MOTOR_PWM, hiz);
}

void robotSag(int hiz = 255) {
    digitalWrite(SOL_MOTOR_IN1, HIGH);
    digitalWrite(SOL_MOTOR_IN2, LOW);
    digitalWrite(SAG_MOTOR_IN1, LOW);
    digitalWrite(SAG_MOTOR_IN2, HIGH);
    analogWrite(SOL_MOTOR_PWM, hiz);
    analogWrite(SAG_MOTOR_PWM, hiz);
}

void robotDur() {
    digitalWrite(SOL_MOTOR_IN1, LOW);
    digitalWrite(SOL_MOTOR_IN2, LOW);
    digitalWrite(SAG_MOTOR_IN1, LOW);
    digitalWrite(SAG_MOTOR_IN2, LOW);
    analogWrite(SOL_MOTOR_PWM, 0);
    analogWrite(SAG_MOTOR_PWM, 0);
}

void robotHiz(int hiz) {
    analogWrite(SOL_MOTOR_PWM, hiz);
    analogWrite(SAG_MOTOR_PWM, hiz);
}
`;
    } else if (robotType === 'LineX') {
        code += `
// LineX motor pin sabitleri
const int SOL_MOTOR_PWM = 3;
const int SOL_MOTOR_IN1 = 4;
const int SOL_MOTOR_IN2 = 5;
const int SAG_MOTOR_PWM = 6;
const int SAG_MOTOR_IN1 = 7;
const int SAG_MOTOR_IN2 = 8;

void robotIleri(int hiz = 255) {
    digitalWrite(SOL_MOTOR_IN1, HIGH);
    digitalWrite(SOL_MOTOR_IN2, LOW);
    digitalWrite(SAG_MOTOR_IN1, HIGH);
    digitalWrite(SAG_MOTOR_IN2, LOW);
    analogWrite(SOL_MOTOR_PWM, hiz);
    analogWrite(SAG_MOTOR_PWM, hiz);
}

void robotGeri(int hiz = 255) {
    digitalWrite(SOL_MOTOR_IN1, LOW);
    digitalWrite(SOL_MOTOR_IN2, HIGH);
    digitalWrite(SAG_MOTOR_IN1, LOW);
    digitalWrite(SAG_MOTOR_IN2, HIGH);
    analogWrite(SOL_MOTOR_PWM, hiz);
    analogWrite(SAG_MOTOR_PWM, hiz);
}

void robotSol(int hiz = 255) {
    digitalWrite(SOL_MOTOR_IN1, LOW);
    digitalWrite(SOL_MOTOR_IN2, HIGH);
    digitalWrite(SAG_MOTOR_IN1, HIGH);
    digitalWrite(SAG_MOTOR_IN2, LOW);
    analogWrite(SOL_MOTOR_PWM, hiz);
    analogWrite(SAG_MOTOR_PWM, hiz);
}

void robotSag(int hiz = 255) {
    digitalWrite(SOL_MOTOR_IN1, HIGH);
    digitalWrite(SOL_MOTOR_IN2, LOW);
    digitalWrite(SAG_MOTOR_IN1, LOW);
    digitalWrite(SAG_MOTOR_IN2, HIGH);
    analogWrite(SOL_MOTOR_PWM, hiz);
    analogWrite(SAG_MOTOR_PWM, hiz);
}

void robotDur() {
    digitalWrite(SOL_MOTOR_IN1, LOW);
    digitalWrite(SOL_MOTOR_IN2, LOW);
    digitalWrite(SAG_MOTOR_IN1, LOW);
    digitalWrite(SAG_MOTOR_IN2, LOW);
    analogWrite(SOL_MOTOR_PWM, 0);
    analogWrite(SAG_MOTOR_PWM, 0);
}

void robotHiz(int hiz) {
    analogWrite(SOL_MOTOR_PWM, hiz);
    analogWrite(SAG_MOTOR_PWM, hiz);
}
`;
    } else if (robotType === 'VivianX') {
        code += `
// VivianX motor pin sabitleri
const int SOL_MOTOR_PWM1 = 9;
const int SOL_MOTOR_PWM2 = 10;
const int SAG_MOTOR_PWM1 = 5;
const int SAG_MOTOR_PWM2 = 6;

void robotIleri(int hiz = 255) {
    analogWrite(SOL_MOTOR_PWM1, hiz);
    digitalWrite(SOL_MOTOR_PWM2, LOW);
    analogWrite(SAG_MOTOR_PWM1, hiz);
    digitalWrite(SAG_MOTOR_PWM2, LOW);
}

void robotGeri(int hiz = 255) {
    digitalWrite(SOL_MOTOR_PWM1, LOW);
    analogWrite(SOL_MOTOR_PWM2, hiz);
    digitalWrite(SAG_MOTOR_PWM1, LOW);
    analogWrite(SAG_MOTOR_PWM2, hiz);
}

void robotSol(int hiz = 255) {
    digitalWrite(SOL_MOTOR_PWM1, LOW);
    analogWrite(SOL_MOTOR_PWM2, hiz);
    analogWrite(SAG_MOTOR_PWM1, hiz);
    digitalWrite(SAG_MOTOR_PWM2, LOW);
}

void robotSag(int hiz = 255) {
    analogWrite(SOL_MOTOR_PWM1, hiz);
    digitalWrite(SOL_MOTOR_PWM2, LOW);
    digitalWrite(SAG_MOTOR_PWM1, LOW);
    analogWrite(SAG_MOTOR_PWM2, hiz);
}

void robotDur() {
    digitalWrite(SOL_MOTOR_PWM1, LOW);
    digitalWrite(SOL_MOTOR_PWM2, LOW);
    digitalWrite(SAG_MOTOR_PWM1, LOW);
    digitalWrite(SAG_MOTOR_PWM2, LOW);
}

void robotHiz(int hiz) {
    // Yön değiştirmez, sadece mevcut yöne PWM uygular
    analogWrite(SOL_MOTOR_PWM1, hiz);
    analogWrite(SOL_MOTOR_PWM2, hiz);
    analogWrite(SAG_MOTOR_PWM1, hiz);
    analogWrite(SAG_MOTOR_PWM2, hiz);
}
`;
    }


    code += `\nvoid setup() {\n`;
    code += `    // Pin modları\n`;

    if (robotType === 'VivianX') {
        code += `    pinMode(START_BUTONU, INPUT);\n`;
        code += `    pinMode(DIP_SWITCH_1, INPUT);\n`;
        code += `    pinMode(DIP_SWITCH_2, INPUT);\n`;
        code += `    pinMode(BUZZER, OUTPUT);\n`;
    } else {
        if (pinMappings.sensors) {
            for (const key in pinMappings.sensors) {
                if (key !== 'Boş') {
                    code += `    pinMode(${replaceTurkishChars(key).replace(/ /g, '_').toUpperCase()}, INPUT);\n`;
                }
            }
        }
        if (pinMappings.digital) {
            for (const key in pinMappings.digital) {
                if (key !== 'Boş') {
                    // Start Butonu ve Dip Switch'ler giriş pini olarak ayarlandı
                    if (key === 'Start Butonu' || key.startsWith('Dip Switch')) {
                        code += `    pinMode(${replaceTurkishChars(key).replace(/ /g, '_').toUpperCase()}, INPUT);\n`;
                    } else {
                        code += `    pinMode(${replaceTurkishChars(key).replace(/ /g, '_').toUpperCase()}, OUTPUT);\n`;
                    }
                }
            }
        }
        if (pinMappings.digitalIO) {
            for (const key in pinMappings.digitalIO) {
                if (key !== 'Boş') {
                    code += `    pinMode(${replaceTurkishChars(key).replace(/ /g, '_').toUpperCase()}, OUTPUT);\n`;
                }
            }
        }
        if (pinMappings.analogIO) {
            for (const key in pinMappings.analogIO) {
                if (key !== 'Boş') {
                    code += `    pinMode(${replaceTurkishChars(key).replace(/ /g, '_').toUpperCase()}, INPUT);\n`;
                }
            }
        }
    }

    if (robotType === 'MazeX' || robotType === 'LineX') {
        code += `\n    pinMode(SOL_MOTOR_PWM, OUTPUT);\n`;
        code += `    pinMode(SOL_MOTOR_IN1, OUTPUT);\n`;
        code += `    pinMode(SOL_MOTOR_IN2, OUTPUT);\n`;
        code += `    pinMode(SAG_MOTOR_PWM, OUTPUT);\n`;
        code += `    pinMode(SAG_MOTOR_IN1, OUTPUT);\n`;
        code += `    pinMode(SAG_MOTOR_IN2, OUTPUT);\n`;
    } else if (robotType === 'VivianX') {
        code += `\n    pinMode(SOL_MOTOR_PWM1, OUTPUT);\n`;
        code += `    pinMode(SOL_MOTOR_PWM2, OUTPUT);\n`;
        code += `    pinMode(SAG_MOTOR_PWM1, OUTPUT);\n`;
        code += `    pinMode(SAG_MOTOR_PWM2, OUTPUT);\n`;
    }

    // Blockly kodunu al
    const blocklyCode = Blockly.JavaScript.workspaceToCode(workspace);
    // Satır satır ayır
    const blocklyLines = blocklyCode.split('\n');
    // pinMode ile başlayanlar setup'a, diğerleri loop'a
    let userSetupLines = [];
    let userLoopLines = [];
    for (const line of blocklyLines) {
        const trimmedLine = line.trim();
        if (trimmedLine.startsWith('var ') ||
            /^int [a-zA-Z0-9_]+ ?= ?0;/.test(trimmedLine) ||
            /^char [a-zA-Z0-9_]+ ?= ?0;/.test(trimmedLine) ||
            /^String [a-zA-Z0-9_]+ ?= ?0;/.test(trimmedLine)) {
            continue; // Değişken tanımlarını loop içine ekleme
        }

        if (trimmedLine.startsWith('pinMode(')) {
            userSetupLines.push('    ' + trimmedLine);
        } else if (trimmedLine !== '') {
            // Sadece setup'ta olması gereken komutları ayır
            if (setupOnlyCommands.some(re => re.test(trimmedLine))) {
                userSetupLines.push('    ' + trimmedLine);
            } else {
                userLoopLines.push('    ' + trimmedLine);
            }
        }
    }

    code += userSetupLines.length > 0 ? userSetupLines.join('\n') + '\n' : '';
    code += `}\n\n`;

    code += `void loop() {\n`;
    code += userLoopLines.length > 0 ? userLoopLines.join('\n') + '\n' : '';
    code += `}\n`;

    // Meta veriler
    const now = new Date();
    const meta = `// Kart tipi: ${selectedRobot || 'Bilinmiyor'}\n// Tarih: ${now.toLocaleString()}\n// Açıklama: CLK Block Code ile oluşturuldu`;

    let fullCode = meta + '\n\n' + code;

    // Konsola üretilen kodu yazdır
    console.log("Üretilen Arduino Kodu:", fullCode);

    document.getElementById('arduinoCode').textContent = fullCode;
    updateToolbox(selectedRobot); // Seçilen robota göre araç kutusunu güncelle
    return fullCode;
}

// Kodu kaydetme fonksiyonu
function saveCode() {
    if (!selectedRobot) {
        showAlert('Uyarı', 'Lütfen önce bir robot kartı seçin.');
        return;
    }
    // Arduino kodunu oluştur
    const code = generateCode();
    const robotName = (selectedRobot || 'mazex').toLowerCase();
    // Tarih ve saat ekle (GG-AA-YYYY_SS-DD)
    // const now = new Date();
    // const pad = n => n.toString().padStart(2, '0');
    // const tarihSaat = `(${pad(now.getDate())}-${pad(now.getMonth()+1)}-${now.getFullYear()}_${pad(now.getHours())}-${pad(now.getMinutes())})`;
    // 01tem25 formatı için:
    const now = new Date();
    const gun = now.getDate().toString().padStart(2, '0');
    const aylar = ['oca', 'sub', 'mar', 'nis', 'may', 'haz', 'tem', 'agu', 'eyl', 'eki', 'kas', 'ara'];
    const ay = aylar[now.getMonth()];
    const yil = now.getFullYear().toString().slice(-2);
    const tarihSaat = `_${gun}${ay}${yil}`;
    // 1. Arduino kodunu kaydet
    const codeBlob = new Blob([code], { type: 'text/plain' });
    const codeUrl = window.URL.createObjectURL(codeBlob);
    const codeA = document.createElement('a');
    codeA.href = codeUrl;
    codeA.download = robotName + '_code' + tarihSaat + '.ino';
    document.body.appendChild(codeA);
    codeA.click();
    window.URL.revokeObjectURL(codeUrl);
    document.body.removeChild(codeA);
    // 2. Blokları XML olarak kaydet
    if (window.Blockly && window.Blockly.Xml && workspace) {
        const xmlDom = Blockly.Xml.workspaceToDom(workspace);
        let innerXml = Blockly.Xml.domToText(xmlDom);
        // <xml> ve </xml> etiketlerini kaldır
        innerXml = innerXml.replace(/^<xml[^>]*>/, '').replace(/<\/xml>$/, '').trim();
        // Yeni XML: <xml>\n<robotType>...</robotType>\n...bloklar...\n</xml>
        const xmlText = `<xml>\n<robotType>${selectedRobot}</robotType>\n${innerXml}\n</xml>`;
        const xmlBlob = new Blob([xmlText], { type: 'text/plain' });
        const xmlUrl = window.URL.createObjectURL(xmlBlob);
        const xmlA = document.createElement('a');
        xmlA.href = xmlUrl;
        xmlA.download = robotName + '_code' + tarihSaat + '.clkcode';
        document.body.appendChild(xmlA);
        xmlA.click();
        window.URL.revokeObjectURL(xmlUrl);
        document.body.removeChild(xmlA);
    }
}

// Kodu yükleme fonksiyonu
function loadCode() {
    const savedXml = localStorage.getItem('savedXml');
    if (savedXml) {
        try {
            const xml = Blockly.utils.xml.textToDom(savedXml);
            workspace.clear();
            Blockly.Xml.domToWorkspace(xml, workspace);
            showAlert('Başarılı', 'Kod başarıyla yüklendi!');
        } catch (error) {
            console.error('XML yükleme hatası:', error);
            showAlert('Hata', 'Kod yüklenirken bir hata oluştu!');
        }
    } else {
        showAlert('Bilgi', 'Kaydedilmiş kod bulunamadı!');
    }
}

// Kodu derleme fonksiyonu
window.compileCode = async function() {
    // Yükleme durumu mesajını sıfırla ve gizle
    hideUploadStatus();

    if (!selectedRobot) {
        showAlert('Uyarı', 'Lütfen önce bir robot kartı seçin.');
        appendConsoleOutput('Derleme başlatılamadı: Robot kartı seçili değil.', 'error');
        return;
    }
    // Kod panelindeki mevcut kodu kullan
    let code = document.getElementById('arduinoCode').textContent || '';
    if (!code || code.length < 10) {
        code = generateCode();
    }
    if (!code || code.length < 10) {
        showAlert('Kod oluşturulamadı!', 'Kodun içeriği: [boş]');
        appendConsoleOutput('Kod oluşturulamadı veya çok kısa!', 'error');
        return;
    }
    try {
        const board = 'arduino:avr:nano';
        appendConsoleOutput('Kod derleniyor...');
        updateUploadStatus('Kod derleniyor...', 'info');
        const result = await window.ipcRenderer.invoke('compile-arduino', {
            code,
            board
        });
        if (result.success) {
            appendConsoleOutput('Kod başarıyla derlendi!', 'success');
            appendConsoleOutput(result.output, 'success');
            updateUploadStatus('Kod başarıyla derlendi!', 'success', 3000);
        } else {
            appendConsoleOutput('Derleme hatası: ' + (result.error || 'Bilinmeyen hata'), 'error');
            appendConsoleOutput(result.details || '', 'error');
            updateUploadStatus('Derleme hatası: ' + (result.error || 'Bilinmeyen hata'), 'error', 5000);
        }
    } catch (err) {
        appendConsoleOutput('Sunucuya bağlanırken hata oluştu: ' + err.message, 'error');
        updateUploadStatus('Sunucuya bağlanırken hata oluştu: ' + err.message, 'error', 5000);
    }
};

// Kodu yükleme fonksiyonu (setup versiyonu için sunucuya gönder)
window.uploadToArduino = async function() {
    // Yüklemeden önce seri monitörü kapat
    if (serialMonitorActive) {
        await closeSerialMonitor();
    }

    // Yükleme durumu mesajını sıfırla ve gizle
    hideUploadStatus();

    if (!selectedRobot) {
        showAlert('Uyarı', 'Lütfen önce bir robot kartı seçin.');
        appendConsoleOutput('Yükleme başlatılamadı: Robot kartı seçili değil.', 'error');
        return;
    }
    if (!selectedPortName) {
        showAlert('Uyarı', 'Lütfen önce bir robot seçin ve bağlanın.');
        appendConsoleOutput('Yükleme başlatılamadı: Port seçili değil.', 'error');
        return;
    }
    // Kod panelindeki mevcut kodu kullan
    let code = document.getElementById('arduinoCode').textContent || '';
    // Kodun tamamını tekrar Türkçe karakterlerden arındır ve pin isimlerini düzelt
    code = replaceTurkishChars(code);
    code = fixPinNames(code);
    if (!code || code.length < 10) {
        showAlert('Kod oluşturulamadı!', 'Kodun içeriği: [boş]');
        appendConsoleOutput('Kod oluşturulamadı veya çok kısa!', 'error');
        return;
    }
    try {
        const board = 'arduino:avr:nano';
        appendConsoleOutput('Kod yükleme başlatıldı...');
        updateUploadStatus('Kod Arduino kartına yükleniyor...', 'info');
        // Portun tamamen serbest bırakılması için kısa bir gecikme ekle
        await new Promise(resolve => setTimeout(resolve, 1000));
        const result = await window.ipcRenderer.invoke('upload-arduino', {
            code,
            port: selectedPortName,
            board
        });
        if (result.success) {
            appendConsoleOutput('Kod başarıyla yüklendi!', 'success');
            appendConsoleOutput(result.output || 'Yükleme tamamlandı.', 'success');
            updateUploadStatus('Kod başarıyla yüklendi!', 'success', 3000);
        } else {
            appendConsoleOutput('Yükleme hatası: ' + (result.error || 'Bilinmeyen hata'), 'error');
            appendConsoleOutput(result.details || '', 'error');
            updateUploadStatus('Yükleme hatası: ' + (result.error || 'Bilinmeyen hata'), 'error', 5000);
        }
    } catch (err) {
        appendConsoleOutput('Sunucuya bağlanırken hata oluştu: ' + err.message, 'error');
        updateUploadStatus('Sunucuya bağlanırken hata oluştu: ' + err.message, 'error', 5000);
    }
};

// Yükleme durumunu güncelleyen yeni fonksiyon
function updateUploadStatus(message, type = 'info', duration = 0) {
    const statusDisplay = document.getElementById('mainUploadStatusMessage');
    if (statusDisplay) {
        statusDisplay.textContent = message;
        statusDisplay.style.display = 'block';
        statusDisplay.style.backgroundColor = ''; // Reset background
        statusDisplay.style.color = '#F9F8F3'; // Default text color

        if (type === 'success') {
            statusDisplay.style.backgroundColor = '#51cf66'; // Green
        } else if (type === 'error') {
            statusDisplay.style.backgroundColor = '#ff6b6b'; // Red
        } else { // info
            statusDisplay.style.backgroundColor = '#339af0'; // Blue
        }

        if (uploadStatusTimeout) {
            clearTimeout(uploadStatusTimeout);
        }
        if (duration > 0) {
            uploadStatusTimeout = setTimeout(() => {
                hideUploadStatus();
            }, duration);
        }
    }
}

// Yükleme durumunu gizleyen fonksiyon
function hideUploadStatus() {
    const statusDisplay = document.getElementById('mainUploadStatusMessage');
    if (statusDisplay) {
        statusDisplay.style.display = 'none';
        statusDisplay.textContent = '';
        statusDisplay.style.backgroundColor = '';
    }
    if (uploadStatusTimeout) {
        clearTimeout(uploadStatusTimeout);
        uploadStatusTimeout = null;
    }
}

// Çalışma alanını temizleme fonksiyonu
function clearWorkspace() {
    showConfirm('Onay', 'Çalışma alanını temizlemek istediğinizden emin misiniz?', (result) => {
        if (result) {
            doClearWorkspace();
            showAlert('Başarılı', 'Çalışma alanı temizlendi!');
        }
    });
}

function showConfirm(title, message, callback) {
    // Onay istemeden doğrudan işlemi gerçekleştir
    callback(true);
}

function doClearWorkspace() {
    workspace.clear();
    localStorage.removeItem('savedXml');
    document.getElementById('arduinoCode').textContent = '';
    const consoleOutput = document.getElementById('consoleOutput');
    if (consoleOutput) consoleOutput.innerHTML = '';
    const serialOutput = document.getElementById('serialOutput');
    if (serialOutput) serialOutput.innerHTML = '';
}

// Sayfa yüklendiğinde
document.addEventListener('DOMContentLoaded', function() {
    // Blockly'yi başlat
    workspace = startBlockly();

    // Modal elementlerini al
    const addRobotButton = document.getElementById('addRobotButton');
    const robotCardModal = document.getElementById('robotCardModal');
    const closeButton = document.querySelector('#robotCardModal .close-button');
    const robotCardList = document.getElementById('robotCardList');
    const robotCardSelectionView = document.getElementById('robotCardSelectionView');
    const deviceSelectionView = document.getElementById('deviceSelectionView');
    const deviceList = document.getElementById('deviceList');
    const refreshDevicesButton = document.getElementById('refreshDevicesButton');
    const selectedRobotDisplay = document.getElementById('selectedRobotDisplay');
    const currentRobotName = document.getElementById('currentRobotName');
    const connectionStatus = document.getElementById('connectionStatus');
    const disconnectRobotButton = document.getElementById('disconnectRobotButton');

    // Başlangıçta seçili robot gösterimini gizle
    if (selectedRobotDisplay) {
        selectedRobotDisplay.style.display = 'none';
    }

    // Örnek Projeler dropdown'ının z-index'ini ayarla
    const ornekProjelerDropdownButton = document.getElementById('ornekProjelerDropdown');
    if (ornekProjelerDropdownButton) {
        ornekProjelerDropdownButton.addEventListener('shown.bs.dropdown', function() {
            const dropdownMenu = this.nextElementSibling; // ul.dropdown-menu'yi al
            if (dropdownMenu && dropdownMenu.classList.contains('dropdown-menu')) {
                dropdownMenu.style.zIndex = '9999'; // Daha yüksek bir z-index değeri
            }
        });
    }

    // "Ekle" butonuna tıklama olayını dinle
    if (addRobotButton) {
        addRobotButton.addEventListener('click', function() {
            // Başka bir robot kartı seçilince blokları sil
            doClearWorkspace();
            robotCardModal.style.display = 'block';
            robotCardSelectionView.style.display = 'block';
            deviceSelectionView.style.display = 'none';
            populateRobotCards(); // Kartları dinamik olarak doldur
            if (!port) { // Eğer bağlı değilsen, robot seçimi modalı açıldığında seçili robotu sıfırla
                selectedRobot = null;
                updateSelectedRobotDisplay();
            }
        });
    }

    // Kapatma butonuna tıklama olayını dinle
    if (closeButton) {
        closeButton.addEventListener('click', function() {
            robotCardModal.style.display = 'none';
            if (!port) { // Eğer bağlı değilsen, modal kapandığında seçili robotu sıfırla
                selectedRobot = null;
                updateSelectedRobotDisplay();
            }
        });
    }

    // Modal dışına tıklanınca kapat
    window.addEventListener('click', function(event) {
        if (event.target == robotCardModal) {
            robotCardModal.style.display = 'none';
            if (!port) { // Eğer bağlı değilsen, modal dışarı tıklayarak kapandığında seçili robotu sıfırla
                selectedRobot = null;
                updateSelectedRobotDisplay();
            }
        }
    });

    // Bağlantıyı Kes butonuna tıklama olayını dinle
    if (disconnectRobotButton) {
        disconnectRobotButton.addEventListener('click', async function() {
            console.log('Bağlantıyı Kes butonuna tıklandı.');
            console.log('Tıklama anında selectedPortName:', selectedPortName, 'selectedRobot:', selectedRobot);

            if (selectedPortName) { // Bir port seçili ise (ve muhtemelen bağlı ise) kontrol et
                try {
                    // Portu main süreçte kapatmak için IPC kullanan fonksiyonu çağır
                    await closeSerialMonitor();

                    // Bağlantıyla ilgili tüm global durum değişkenlerini sıfırla
                    port = null;
                    selectedPortName = null;
                    selectedRobot = null;

                    console.log("selectedRobot after setting to null:", selectedRobot);
                    updateSelectedRobotDisplay(); // UI'yı güncelle
                    showAlert('Başarılı', 'Cihaz bağlantısı kesildi.');
                } catch (err) {
                    console.error('Bağlantı kesme hatası:', err);
                    // Hata durumunda bile durumu sıfırla
                    port = null;
                    selectedPortName = null;
                    selectedRobot = null;
                    updateSelectedRobotDisplay();
                    showAlert('Hata', 'Cihaz bağlantısı kesilirken bir hata oluştu: ' + err.message);
                }
            } else {
                showAlert('Bilgi', 'Zaten bağlı bir cihaz yok.');
            }
        });
    }

    // Cihazları Yenile butonuna tıklama olayını dinle
    if (refreshDevicesButton) {
        refreshDevicesButton.addEventListener('click', async function() {
            await populateDeviceList(true); // Cihazları yenile ve yeniden listele
        });
    }

    // Robot kartlarını doldurma fonksiyonu
    function populateRobotCards() {
        robotCardList.innerHTML = ''; // Önceki kartları temizle
        for (const robotType in robotCardPinMappings) {
            const cardItem = document.createElement('div');
            cardItem.classList.add('card-item');
            if (robotType === selectedRobot) {
                cardItem.classList.add('selected');
            }
            cardItem.innerHTML = `
                <img src="images/${robotType.toLowerCase()}.png" alt="${robotType}">
                <h4>${robotType}</h4>
            `;
            cardItem.addEventListener('click', function() {
                // Başka bir robot kartı seçilince blokları sil
                doClearWorkspace();
                selectedRobot = robotType;
                updateToolbox(selectedRobot);
                updateRobotImage(selectedRobot);

                // Seçilen kartı işaretle
                document.querySelectorAll('.card-item').forEach(item => {
                    item.classList.remove('selected');
                });
                this.classList.add('selected');

                // Cihaz seçim görünümüne geç
                robotCardSelectionView.style.display = 'none';
                deviceSelectionView.style.display = 'block';
                populateDeviceList(); // Cihaz listesini doldur
            });
            robotCardList.appendChild(cardItem);
        }
        // selectedRobot null ise, 'Robot Yükle' yazacak
        document.getElementById('uploadButtonText').textContent = selectedRobot ? `${selectedRobot} Yükle` : 'Robot Yükle';
        updateSelectedRobotDisplay(); // Seçili robot gösterimini güncelle
    }

    // Cihaz listesini doldurma fonksiyonu (Electron)
    async function populateDeviceList(forceRefresh = false) {
        deviceList.innerHTML = '';
        document.getElementById('deviceSelectionMessage').textContent = 'Cihazlar aranıyor...';

        // Cihaz listesini yan yana sıralamak için stil ayarları
        deviceList.style.display = 'flex';
        deviceList.style.flexWrap = 'wrap';
        deviceList.style.justifyContent = 'center';
        deviceList.style.gap = '10px';

        if (!window.ipcRenderer) {
            document.getElementById('deviceSelectionMessage').textContent = 'Electron ortamı algılanamadı. Lütfen masaüstü uygulamasını kullanın.';
            showAlert('Uyarı', 'Electron ortamı algılanamadı. Lütfen masaüstü uygulamasını kullanın.');
            return;
        }

        try {
            // Ana süreçten port listesini al
            const ports = await window.ipcRenderer.invoke('list-serial-ports');
            // --- BAĞLANTI KOPTU KONTROLÜ ---
            if (selectedPortName) {
                const portNames = ports.map(p => p.path || p.comName || p.device || '');
                if (!portNames.includes(selectedPortName)) {
                    selectedPortName = null;
                    updateSelectedRobotDisplay();
                }
            }
            // --- SONU ---
            if (!ports || ports.length === 0) {
                document.getElementById('deviceSelectionMessage').textContent = 'Hiçbir robot kartı bulunamadı. Lütfen robotunuzu bağlayın ve yeniden deneyin.';
                showAlert('Bilgi', 'Hiçbir robot kartı bulunamadı. Lütfen robotunuzu bağlayın ve yeniden deneyin.');
                return;
            }
            document.getElementById('deviceSelectionMessage').textContent = 'Bir cihaz seçin:';
            deviceList.innerHTML = ''; // Temizle
            ports.forEach(p => {
                const listItem = document.createElement('div');
                listItem.classList.add('card-item');
                const portName = p.path || p.comName || p.device || '';

                if (p.friendlyName) {
                    listItem.innerHTML = `<h4>${p.friendlyName}</h4>`;
                } else {
                    const vendorId = p.vendorId ? `Vendor ID: ${p.vendorId}` : '';
                    const productId = p.productId ? `Product ID: ${p.productId}` : '';
                    listItem.innerHTML = `
                        <h4>USB Cihaz</h4>
                        <p>${vendorId}</p>
                        <p>${productId}</p>
                        <p>Port: ${portName}</p>
                    `;
                }

                listItem.addEventListener('click', async function() {
                    // Blokları silme! Sadece portu seç
                    // if (!isFileLoadInProgress) {
                    //     doClearWorkspace(); // KALDIRILDI
                    // }
                    selectedPortName = portName;
                    robotCardModal.style.display = 'none';
                    updateSelectedRobotDisplay();
                    showAlert('Başarılı', 'Cihaz başarıyla seçildi!');
                    // Dosyadan yükleme işlemi bittiyse flag'i sıfırla
                    isFileLoadInProgress = false;
                });
                deviceList.appendChild(listItem);
            });
        } catch (err) {
            document.getElementById('deviceSelectionMessage').textContent = 'Cihazlar listelenirken bir hata oluştu.';
            showAlert('Hata', 'Cihazlar listelenirken bir hata oluştu: ' + err.message);
        }
    }

    // Seçili robot gösterimini güncelleme fonksiyonu
    function updateSelectedRobotDisplay() {
        console.log('updateSelectedRobotDisplay çağrıldı.');
        // selectedPortName'e güvenmek için koşulu değiştir
        console.log('Mevcut selectedRobot:', selectedRobot, 'Mevcut selectedPortName:', selectedPortName);

        const selectedRobotDisplay = document.getElementById('selectedRobotDisplay');
        const currentRobotName = document.getElementById('currentRobotName');
        const connectionStatus = document.getElementById('connectionStatus');
        const disconnectRobotButton = document.getElementById('disconnectRobotButton');
        const robotImage = document.getElementById('robotCardImage');

        // Koşul kontrolü: selectedRobot boş olmamalı VE selectedPortName boş olmamalı
        if (selectedRobot && selectedPortName) {
            console.log('Robot seçili ve port bağlı, selectedRobotDisplay: block.');
            selectedRobotDisplay.style.display = 'block';
            currentRobotName.textContent = selectedRobot;
            document.getElementById('uploadButtonText').textContent = `${selectedRobot} Yükle`;
            disconnectRobotButton.style.display = 'block';
            connectionStatus.textContent = 'Bağlı';
            connectionStatus.style.color = 'green';
            document.getElementById('currentPortName').textContent = selectedPortName;
            if (robotImage) {
                robotImage.src = `images/${selectedRobot.toLowerCase()}.png`;
                robotImage.style.display = 'block';
            }
        } else if (selectedRobot && !selectedPortName) {
            // Sadece robot seçiliyse ve port yoksa göster
            selectedRobotDisplay.style.display = 'block';
            currentRobotName.textContent = selectedRobot;
            document.getElementById('uploadButtonText').textContent = `${selectedRobot} Yükle`;
            disconnectRobotButton.style.display = 'none';
            connectionStatus.textContent = 'Bağlantı Yok';
            connectionStatus.style.color = 'red';
            document.getElementById('currentPortName').textContent = '-';
            if (robotImage) {
                robotImage.src = `images/${selectedRobot.toLowerCase()}.png`;
                robotImage.style.display = 'block';
            }
        } else {
            // Hiçbir robot seçili değilse veya ilk açılışta hiçbir şey gösterme
            selectedRobotDisplay.style.display = 'none';
            currentRobotName.textContent = '';
            document.getElementById('uploadButtonText').textContent = 'Robot Yükle';
            disconnectRobotButton.style.display = 'none';
            connectionStatus.textContent = '';
            connectionStatus.style.color = 'red';
            document.getElementById('currentPortName').textContent = '-';
            if (robotImage) {
                robotImage.src = '';
                robotImage.style.display = 'none';
            }
        }
    }

    // Sayfa yüklendiğinde kartları doldur ve başlangıç seçimini yap
    populateRobotCards();

    // Sağ paneli aç/kapat
    const toggleRightPanelButton = document.getElementById('toggleRightPanel');
    const rightPanel = document.getElementById('rightPanel');
    const toggleIcon = toggleRightPanelButton.querySelector('i');

    toggleRightPanelButton.addEventListener('click', () => {
        rightPanel.classList.toggle('open');
        if (rightPanel.classList.contains('open')) {
            toggleIcon.classList.remove('fa-chevron-left');
            toggleIcon.classList.add('fa-chevron-right');
            toggleRightPanelButton.style.right = '25vw'; // Panel genişliği kadar sağdan uzaklaştır
        } else {
            toggleIcon.classList.remove('fa-chevron-right');
            toggleIcon.classList.add('fa-chevron-left');
            toggleRightPanelButton.style.right = '0';
        }
    });

    // Örnek proje yükleme fonksiyonu
    window.loadOrnekProje = function(projeId) {
        let xmlText;
        if (projeId === 'blink_d13') {
            xmlText = `<xml xmlns="https://developers.google.com/blockly/xml">
              <block type="controls_forever" x="10" y="10">
                <statement name="DO">
                  <block type="digital_write">
                    <value name="PIN">
                      <shadow type="math_number">
                        <field name="NUM">13</field>
                      </shadow>
                    </value>
                    <value name="VALUE">
                      <shadow type="math_number">
                        <field name="NUM">1</field>
                      </shadow>
                    </value>
                    <next>
                      <block type="robot_bekle">
                        <field name="SÜRE">500</field>
                        <next>
                          <block type="digital_write">
                            <value name="PIN">
                              <shadow type="math_number">
                                <field name="NUM">13</field>
                              </shadow>
                            </value>
                            <value name="VALUE">
                              <shadow type="math_number">
                                <field name="NUM">0</field>
                              </shadow>
                            </value>
                            <next>
                              <block type="robot_bekle">
                                <field name="SÜRE">500</field>
                              </block>
                            </next>
                          </block>
                        </next>
                      </block>
                    </next>
                  </block>
                </statement>
              </block>
            </xml>`;
        }
        if (xmlText) {
            let xmlDom = null;
            if (Blockly.utils && Blockly.utils.xml && typeof Blockly.utils.xml.textToDom === 'function') {
                xmlDom = Blockly.utils.xml.textToDom(xmlText);
            } else if (Blockly.Xml && typeof Blockly.Xml.textToDom === 'function') {
                xmlDom = Blockly.Xml.textToDom(xmlText);
            } else {
                showAlert('Hata', 'Blockly XML parser bulunamadı!');
                return;
            }
            if (workspace) {
                workspace.clear();
                Blockly.Xml.domToWorkspace(xmlDom, workspace);
                generateCode();
            }
        }
    };

    // Sol panel toggle fonksiyonu
    const toggleLeftPanel = document.getElementById('toggleLeftPanel');
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');

    if (toggleLeftPanel) {
        toggleLeftPanel.addEventListener('click', function() {
            sidebar.classList.toggle('open');
            const icon = this.querySelector('i');
            if (sidebar.classList.contains('open')) {
                icon.classList.remove('fa-chevron-right');
                icon.classList.add('fa-chevron-left');
                toggleLeftPanel.style.left = '200px';
            } else {
                icon.classList.remove('fa-chevron-left');
                icon.classList.add('fa-chevron-right');
                toggleLeftPanel.style.left = '0';
            }
        });
    }

    const customAlertModal = document.getElementById('customAlertModal');
    const customAlertOkButton = document.getElementById('customAlertOkButton');

    customAlertOkButton.addEventListener('click', function() {
        customAlertModal.style.display = 'none';
    });

    // Serial Monitor için WebSerial bağlantı yönetimi
    async function openSerialMonitor() {
        if (!window.ipcRenderer) {
            showAlert('Uyarı', 'Electron ortamı algılanamadı. Lütfen masaüstü uygulamasını kullanın.');
            return;
        }

        const baudRate = document.getElementById('baudRateSelect').value;

        try {
            // selectedPortName global değişkeni zaten list-serial-ports handlerında ayarlanmış olmalı
            if (!selectedPortName) {
                showAlert('Uyarı', 'Lütfen önce bir port seçin ve bağlanın.');
                return;
            }
            const response = await window.ipcRenderer.invoke('open-serial-port', { path: selectedPortName, baudRate: parseInt(baudRate) });
            if (response.success) {
                serialMonitorActive = true;
                appendSerialOutput('Bağlantı kuruldu: ' + selectedPortName + ' @ ' + baudRate + ' baud', 'success');
                // Veri okuma loop'u yerine IPC dinleyici kullanacağız
                if (!window.serialDataListenerAdded) {
                    window.ipcRenderer.on('serial-data', (event, data) => {
                        appendSerialOutput(data, 'info');
                    });
                    window.serialDataListenerAdded = true;
                }
            } else {
                throw new Error(response.error);
            }
        } catch (e) {
            if (e && e.message && e.message.includes('already open')) {
                showAlert('Uyarı', 'Port başka bir uygulama tarafından kullanılıyor. Kod yükleme veya başka bir Serial Monitör bağlantısı açık olabilir. Lütfen portu serbest bırakıp tekrar deneyin.');
            } else {
                appendSerialOutput('Bağlantı hatası: ' + e, 'error');
            }
        }
    }

    // readSerialLoop fonksiyonu artık kullanılmayacak, main.js tarafında yönetilecek.
    /*
    async function readSerialLoop() {
        if (!serialPort) return;
        serialReader = serialPort.readable.getReader();
        let buffer = ""; // Satır biriktirme tamponu
        try {
            while (serialMonitorActive) {
                const { value, done } = await serialReader.read();
                if (done) break;
                if (value) {
                    const text = new TextDecoder().decode(value);
                    buffer += text;
                    let lines = buffer.split('\n');
                    buffer = lines.pop(); // Son satır tamamlanmamış olabilir
                    for (const line of lines) {
                        appendSerialOutput(line, 'info');
                    }
                }
            }
            // Döngü bittiğinde bufferdaki kalan veri varsa onu da yaz
            if (buffer.length > 0) {
                appendSerialOutput(buffer, 'info');
            }
        } catch (e) {
            appendSerialOutput('Okuma hatası: ' + e, 'error');
        } finally {
            serialReader.releaseLock();
        }
    }
    */

    async function closeSerialMonitor() {
        serialMonitorActive = false;
        // Seri portu kapatmak için main process'e mesaj gönder
        try {
            const response = await window.ipcRenderer.invoke('close-serial-port');
            if (response.success) {
                appendSerialOutput('Bağlantı kapatıldı.', 'info');
            } else {
                throw new Error(response.error);
            }
        } catch (e) {
            appendSerialOutput('Bağlantı kapatılırken hata oluştu: ' + e, 'error');
        }
        serialPort = null; // serialPort değişkenini sıfırla
    }

    function appendSerialOutput(message, type = 'info') {
        const serialOutput = document.getElementById('serialOutput');
        if (!serialOutput) return;
        const timestamp = new Date().toLocaleTimeString();
        const logMessage = document.createElement('div');
        logMessage.innerHTML = `<span style="color: #888">[${timestamp}]</span> <span style="color: ${type === 'error' ? '#ff6b6b' : type === 'success' ? '#51cf66' : '#339af0'}">${message}</span>`;
        serialOutput.appendChild(logMessage);
        serialOutput.scrollTop = serialOutput.scrollHeight;
    }

    // Seri monitörden Arduino'ya mesaj gönderme fonksiyonu
    async function sendSerialMessage() {
        // if (!serialPort || !serialMonitorActive) {
        if (!serialMonitorActive) {
            showAlert('Uyarı', 'Seri port bağlı değil.');
            return;
        }
        const message = document.getElementById('serialMessageInput').value + '\n'; // Yeni satır ekle
        try {
            await window.ipcRenderer.invoke('write-serial-port', { message: message });
            appendSerialOutput('Gönderilen: ' + message.trim(), 'sent'); // Gönderilen mesajı da göster
            document.getElementById('serialMessageInput').value = ''; // Inputu temizle
        } catch (e) {
            appendSerialOutput('Mesaj gönderme hatası: ' + e, 'error');
        }
    }

    // Serial Monitör paneline buton ekle ve event listener ekle
    const serialPanel = document.getElementById('collapseSerialMonitor');
    if (serialPanel) {
        const btnDiv = document.createElement('div');
        btnDiv.style.display = 'flex';
        btnDiv.style.alignItems = 'center';
        btnDiv.style.justifyContent = 'center';
        btnDiv.style.margin = '8px 12px 0 0';
        btnDiv.style.gap = '8px'; // Elemanlar arasına boşluk ekle
        const openBtn = document.createElement('button');
        openBtn.textContent = 'Bağlan';
        openBtn.className = 'btn btn-primary';
        openBtn.style.whiteSpace = 'nowrap';
        openBtn.style.height = '38px';
        openBtn.style.lineHeight = '38px';
        openBtn.style.boxSizing = 'border-box';
        openBtn.style.padding = '0 10px';
        openBtn.style.border = '1px solid #CCCCCC';
        openBtn.style.margin = '0'; // Kenar boşluklarını sıfırla
        openBtn.onclick = openSerialMonitor;
        const closeBtn = document.createElement('button');
        closeBtn.textContent = 'Bağlantıyı Kes';
        closeBtn.className = 'btn btn-primary';
        // closeBtn.style.marginLeft = '8px'; // Gap ile yönetilecek
        closeBtn.style.whiteSpace = 'nowrap';
        closeBtn.style.height = '38px';
        closeBtn.style.lineHeight = '38px';
        closeBtn.style.boxSizing = 'border-box';
        closeBtn.style.padding = '0 10px';
        closeBtn.style.border = '1px solid #CCCCCC';
        closeBtn.style.margin = '0'; // Kenar boşluklarını sıfırla
        closeBtn.onclick = closeSerialMonitor;

        const baudRateSelect = document.getElementById('baudRateSelect');
        if (baudRateSelect) {
            // baudRateSelect.style.marginRight = '8px'; // Gap ile yönetilecek
            baudRateSelect.style.height = '38px';
            baudRateSelect.style.lineHeight = 'normal'; // Select elementi için normal line-height
            baudRateSelect.style.boxSizing = 'border-box';
            baudRateSelect.style.padding = '0 10px';
            baudRateSelect.style.border = '1px solid #CCCCCC';
            baudRateSelect.style.margin = '0'; // Kenar boşluklarını sıfırla
            btnDiv.prepend(baudRateSelect);
        }

        btnDiv.appendChild(openBtn);
        btnDiv.appendChild(closeBtn);
        serialPanel.querySelector('.accordion-body').prepend(btnDiv);

        // Mesaj gönderme bölümü için yeni bir kapsayıcı oluştur
        const sendMessageBox = document.createElement('div');
        sendMessageBox.style.display = 'flex';
        sendMessageBox.style.alignItems = 'center';
        sendMessageBox.style.justifyContent = 'center';
        sendMessageBox.style.marginTop = '10px';
        sendMessageBox.style.marginBottom = '10px';
        sendMessageBox.style.gap = '1px'; // Elemanlar arasına boşluk 1px olarak ayarlandı

        const sendBtn = document.getElementById('sendSerialMessageBtn');
        if (sendBtn) {
            sendBtn.style.height = '38px';
            sendBtn.style.lineHeight = '38px'; // Buton metni için dikeyde ortala
            sendBtn.style.boxSizing = 'border-box';
            sendBtn.style.padding = '0 10px';
            sendBtn.style.border = '1px solid #CCCCCC';
            sendBtn.style.margin = '0';
        }
        const messageInput = document.getElementById('serialMessageInput');

        if (messageInput) {
            messageInput.style.flexGrow = '1';
            messageInput.style.marginRight = '8px';
            messageInput.style.height = '38px';
            messageInput.style.lineHeight = 'normal'; // Input elementi için normal line-height
            messageInput.style.lineHeight = '38px';
            messageInput.style.boxSizing = 'border-box';
            messageInput.style.padding = '0 10px';
            messageInput.style.border = '1px solid #CCCCCC';
            messageInput.style.margin = '0 8px 0 0';
            messageInput.style.verticalAlign = 'middle'; // Dikey hizalama
            // Input alanında Enter tuşuna basıldığında mesaj gönderme
            messageInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    sendSerialMessage();
                }
            });
            sendMessageBox.appendChild(messageInput);
        }
        if (sendBtn) {
            sendBtn.addEventListener('click', sendSerialMessage);
            sendMessageBox.appendChild(sendBtn);
        }

        serialPanel.querySelector('.accordion-body').appendChild(sendMessageBox);
    }

    const minimizeBtn = document.getElementById('minimizeBtn');
    const maximizeBtn = document.getElementById('maximizeBtn');
    const closeBtn = document.getElementById('closeBtn');
    if (minimizeBtn) minimizeBtn.addEventListener('click', () => window.ipcRenderer.send ? window.ipcRenderer.send('window-minimize') : null);
    if (maximizeBtn) maximizeBtn.addEventListener('click', () => window.ipcRenderer.send ? window.ipcRenderer.send('window-maximize') : null);
    if (closeBtn) closeBtn.addEventListener('click', () => window.ipcRenderer.send ? window.ipcRenderer.send('window-close') : null);

    // ... existing code ...
    window.closeSerialMonitor = closeSerialMonitor;
    // ... existing code ...

    // .clkcode dosyasını açmak için fonksiyon
    // Dosyadan yükleme sırasında workspace temizlenmesin diye flag
    let isFileLoadInProgress = false;

    function openFileDialog() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.clkcode';
        input.style.display = 'none';
        input.onchange = function(event) {
            const file = event.target.files[0];
            if (!file) return;
            // Dosya adını ekranda göster
            const statusDiv = document.getElementById('mainUploadStatusMessage');
            if (statusDiv) {
                statusDiv.textContent = `Açılan dosya: ${file.name}`;
                statusDiv.style.display = 'block';
                setTimeout(() => { statusDiv.style.display = 'none'; }, 5000);
            }
            const reader = new FileReader();
            reader.onload = function(e) {
                try {
                    isFileLoadInProgress = true;
                    const xmlText = e.target.result;
                    let xmlDom = null;
                    if (window.Blockly && window.Blockly.utils && window.Blockly.utils.xml && typeof window.Blockly.utils.xml.textToDom === 'function') {
                        xmlDom = Blockly.utils.xml.textToDom(xmlText);
                    } else if (window.Blockly && window.Blockly.Xml && typeof window.Blockly.Xml.textToDom === 'function') {
                        xmlDom = Blockly.Xml.textToDom(xmlText);
                    }
                    if (xmlDom && workspace) {
                        // Robot tipini <xml> içindeki <robotType> etiketinden bul
                        let robotType = null;
                        const robotTypeNode = xmlDom.getElementsByTagName('robotType')[0];
                        if (robotTypeNode && robotTypeNode.textContent) {
                            robotType = robotTypeNode.textContent.trim();
                        }
                        if (robotType && robotCardPinMappings[robotType]) {
                            selectedRobot = robotType;
                            updateToolbox(selectedRobot);
                            updateRobotImage(selectedRobot);
                        }
                        // <robotType> etiketini sil (bloklara eklenmesin)
                        if (robotTypeNode) {
                            robotTypeNode.parentNode.removeChild(robotTypeNode);
                        }
                        workspace.clear();
                        Blockly.Xml.domToWorkspace(xmlDom, workspace);
                        generateCode();
                        // Cihaz seçme modalını aç
                        if (typeof robotCardModal !== 'undefined' && typeof deviceSelectionView !== 'undefined' && typeof populateDeviceList === 'function') {
                            robotCardModal.style.display = 'block';
                            if (typeof robotCardSelectionView !== 'undefined') robotCardSelectionView.style.display = 'none';
                            deviceSelectionView.style.display = 'block';
                            populateDeviceList();
                        }
                        showAlert('Başarılı', 'Bloklar başarıyla yüklendi! Lütfen cihaz seçin.');
                    } else {
                        showAlert('Hata', 'XML dosyası yüklenemedi!');
                        isFileLoadInProgress = false;
                    }
                } catch (err) {
                    showAlert('Hata', 'Bloklar yüklenirken bir hata oluştu: ' + err.message);
                    isFileLoadInProgress = false;
                }
                // isFileLoadInProgress burada false yapılmıyor! Port seçilince sıfırlanacak.
            };
            reader.readAsText(file);
        };
        document.body.appendChild(input);
        input.click();
        document.body.removeChild(input);
    }
    window.openFileDialog = openFileDialog;

    // --- OTOMATİK PORT TARAMA ---
    function startAutoPortScan() {
        let lastPortCount = 0;
        setInterval(async() => {
            if (selectedRobot) {
                const ports = await window.ipcRenderer.invoke('list-serial-ports');
                // Port sayısı arttıysa ve selectedPortName yoksa cihaz seçme modalını aç
                if (ports.length > lastPortCount && !selectedPortName) {
                    if (typeof robotCardModal !== 'undefined' && typeof deviceSelectionView !== 'undefined') {
                        robotCardModal.style.display = 'block';
                        if (typeof robotCardSelectionView !== 'undefined') robotCardSelectionView.style.display = 'none';
                        deviceSelectionView.style.display = 'block';
                    }
                }
                lastPortCount = ports.length;
                populateDeviceList();
            }
        }, 2000);
    }
    // --- SONU ---

    populateRobotCards();
    // Otomatik port taramayı başlat
    startAutoPortScan();
});

// Tuş olaylarını dinle
document.addEventListener('keydown', function(event) {
    // ... existing code ...
});

// Hareket Blokları
Blockly.Blocks['robot_ileri'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("İleri Git");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#4A90E2'); // Hareket
        this.setTooltip("Robotu ileri hareket ettirir");
    }
};

Blockly.Blocks['robot_geri'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Geri Git");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#4A90E2'); // Hareket
        this.setTooltip("Robotu geri hareket ettirir");
    }
};

Blockly.Blocks['robot_sol'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Sola Dön");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#4A90E2'); // Hareket
        this.setTooltip("Robotu sola döndürür");
    }
};

Blockly.Blocks['robot_sag'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Sağa Dön");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#4A90E2'); // Hareket
        this.setTooltip("Robotu sağa döndürür");
    }
};

Blockly.Blocks['robot_dur'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Dur");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#4A90E2'); // Hareket
        this.setTooltip("Robotu durdurur");
    }
};

Blockly.Blocks['robot_hiz'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Hız");
        this.appendValueInput("HIZ")
            .setCheck('Number')
            .appendField("");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#4A90E2'); // Hareket
        this.setTooltip("Robot hızını ayarlar (0-255)");
    }
};

Blockly.Blocks['robot_bekle'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Bekle");
        this.appendValueInput("SÜRE")
            .setCheck('Number')
            .appendField("ms");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#FF6680'); // Hareket
        this.setTooltip("Belirtilen süre kadar bekler (milisaniye)");
    }
};

// Sensör Blokları
Blockly.Blocks['read_sensor'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Sensör Oku")
            .appendField(new Blockly.FieldDropdown(getSensorOptionsForDropdown), "SENSOR_TYPE");
        this.setOutput(true, null);
        this.setColour('#50E3C2'); // Giriş/Çıkış
        this.setTooltip("Sensör değerini okur (0-1023)");
    }
};

Blockly.Blocks['read_digital_pin'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Dijital Pini Oku")
            .appendField(new Blockly.FieldDropdown(getDigitalInputPinOptionsForDropdown), "PIN");
        this.setOutput(true, "Boolean");
        this.setColour('#50E3C2'); // Giriş/Çıkış
        this.setTooltip("Belirtilen dijital pinin değerini okur (HIGH/LOW).");
    }
};

// Standby ve Fan Kontrol Blokları
Blockly.Blocks['robot_standby'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Motor Standby");
        this.appendValueInput("STATE")
            .setCheck('Number')
            .appendField("");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#4A90E2'); // Hareket
        this.setTooltip("Motor sürücüsünün standby pinini HIGH/LOW yapar");
    }
};

Blockly.Blocks['robot_fan'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Fan");
        this.appendValueInput("STATE")
            .setCheck('Number')
            .appendField("");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#50E3C2'); // Giriş/Çıkış
        this.setTooltip("Robotun fanını kontrol eder");
    }
};

Blockly.Blocks['linex_fan_control'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Fan Kontrol");
        this.appendValueInput("STATE")
            .setCheck('Number')
            .appendField("");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("LineX robotunun fanını kontrol eder");
    }
};

// Seri Port Blokları
Blockly.Blocks['serial_print'] = {
    init: function() {
        this.appendValueInput("TEXT")
            .setCheck(null)
            .appendField("Seri Port Yaz");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#FFD700'); // Seri Port
        this.setTooltip("Seri porta veri yazar");
    }
};

Blockly.Blocks['serial_println'] = {
    init: function() {
        this.appendValueInput("TEXT")
            .setCheck(null)
            .appendField("Seri Port Yaz Satır");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#FFD700'); // Seri Port
        this.setTooltip("Seri porta veri yazar ve yeni satıra geçer");
    }
};

// Blockly.Blocks['serial_read'] = {
//     init: function() {
//         this.appendDummyInput()
//             .appendField("Seri Porttan Oku");
//         this.setOutput(true, "Number"); // Char değeri döneceği için Number olarak ayarla
//         this.setColour('#FFD700'); // Seri Port
//         this.setTooltip("Seri porttan bir bayt okur (karakter olarak).");
//     }
// };

// Blockly.Blocks['serial_available'] = {
//     init: function() {
//         this.appendDummyInput()
//             .appendField("Seri Port Veri Mevcut Mu?");
//         this.setOutput(true, "Boolean");
//         this.setColour('#FFD700'); // Seri Port
//         this.setTooltip("Seri portta okunacak veri olup olmadığını kontrol eder.");
//     }
// };

// Kontrol Blokları
Blockly.Blocks['controls_if'] = {
    init: function() {
        this.appendValueInput("IF0")
            .setCheck("Boolean")
            .appendField("Eğer");
        this.appendStatementInput("DO0")
            .setCheck(null);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#F5A623'); // Kontrol
        this.setTooltip("Koşul doğruysa içindeki blokları çalıştırır");
    }
};

Blockly.Blocks['controls_if_else'] = {
    init: function() {
        this.appendValueInput("IF0")
            .setCheck("Boolean")
            .appendField("Eğer");
        this.appendStatementInput("DO0")
            .setCheck(null);
        this.appendStatementInput("ELSE")
            .setCheck(null)
            .appendField("Değilse");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#F5A623'); // Kontrol
        this.setTooltip("Koşul doğruysa ilk blokları, değilse ikinci blokları çalıştırır");
    }
};

Blockly.Blocks['controls_repeat_ext'] = {
    init: function() {
        this.appendValueInput("TIMES")
            .setCheck("Number")
            .appendField("Şu kadar kez tekrarla");
        this.appendStatementInput("DO")
            .setCheck(null);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#F5A623'); // Kontrol
        this.setTooltip("Belirtilen sayı kadar tekrarlar");
    }
};

Blockly.Blocks['controls_for'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Sayacı")
            .appendField(new Blockly.FieldTextInput("i"), "VAR")
            .appendField("başlat");
        this.appendValueInput("FROM")
            .setCheck("Number")
            .appendField("şuradan");
        this.appendValueInput("TO")
            .setCheck("Number")
            .appendField("şuraya kadar");
        this.appendValueInput("BY")
            .setCheck("Number")
            .appendField("artışla");
        this.appendStatementInput("DO")
            .appendField("");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#F5A623'); // Kontrol
        this.setTooltip("Belirtilen sayıda tekrar eden bir döngü oluşturur.");
    }
};

Blockly.Blocks['controls_forever'] = {
    init: function() {
        this.appendStatementInput("DO")
            .setCheck(null)
            .appendField("Sürekli Tekrarla");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#F5A623'); // Kontrol
        this.setTooltip("İçindeki blokları sürekli tekrarlar");
    }
};

Blockly.Blocks['controls_repeat_until'] = {
    init: function() {
        this.appendValueInput("CONDITION")
            .setCheck("Boolean")
            .appendField("Koşul doğru olana kadar tekrarla");
        this.appendStatementInput("DO")
            .setCheck(null);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#F5A623'); // Kontrol
        this.setTooltip("Koşul doğru olana kadar tekrarlar");
    }
};

Blockly.Blocks['controls_flow_statements'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([
                ["Döngüden Çık", "BREAK"],
                ["Devam Et", "CONTINUE"]
            ]), "MODE");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#F5A623'); // Kontrol
        this.setTooltip("Sadece döngü blokları (tekrar, for, forever) içinde kullanılmalıdır. Başka yere bağlanırsa hata oluşur.");
    }
};

// Operatör Blokları
Blockly.Blocks['operator_add'] = {
    init: function() {
        this.appendValueInput("A")
            .setCheck("Number");
        this.appendValueInput("B")
            .setCheck("Number")
            .appendField("+");
        this.setOutput(true, "Number");
        this.setColour('#7ED321'); // İşlemler
        this.setTooltip("İki sayıyı toplar");
    }
};

Blockly.Blocks['operator_subtract'] = {
    init: function() {
        this.appendValueInput("A")
            .setCheck("Number");
        this.appendValueInput("B")
            .setCheck("Number")
            .appendField("-");
        this.setOutput(true, "Number");
        this.setColour('#7ED321'); // İşlemler
        this.setTooltip("İki sayıyı çıkarır");
    }
};

Blockly.Blocks['operator_multiply'] = {
    init: function() {
        this.appendValueInput("A")
            .setCheck("Number");
        this.appendValueInput("B")
            .setCheck("Number")
            .appendField("×");
        this.setOutput(true, "Number");
        this.setColour('#7ED321'); // İşlemler
        this.setTooltip("İki sayıyı çarpar");
    }
};

Blockly.Blocks['operator_divide'] = {
    init: function() {
        this.appendValueInput("A")
            .setCheck("Number");
        this.appendValueInput("B")
            .setCheck("Number")
            .appendField("÷");
        this.setOutput(true, "Number");
        this.setColour('#7ED321'); // İşlemler
        this.setTooltip("İki sayıyı böler");
    }
};

Blockly.Blocks['operator_random'] = {
    init: function() {
        this.appendValueInput("FROM")
            .setCheck("Number")
            .appendField("Rastgele Sayı");
        this.appendValueInput("TO")
            .setCheck("Number")
            .appendField("ile");
        this.setOutput(true, "Number");
        this.setColour('#7ED321'); // İşlemler
        this.setTooltip("İki sayı arasında rastgele sayı üretir");
    }
};

Blockly.Blocks['operator_gt'] = {
    init: function() {
        this.appendValueInput("A")
            .setCheck("Number");
        this.appendValueInput("B")
            .setCheck("Number")
            .appendField(">");
        this.setOutput(true, "Boolean");
        this.setColour('#7ED321'); // İşlemler
        this.setTooltip("İlk sayı ikinciden büyük mü?");
    }
};

Blockly.Blocks['operator_lt'] = {
    init: function() {
        this.appendValueInput("A")
            .setCheck("Number");
        this.appendValueInput("B")
            .setCheck("Number")
            .appendField("<");
        this.setOutput(true, "Boolean");
        this.setColour('#7ED321'); // İşlemler
        this.setTooltip("İlk sayı ikinciden küçük mü?");
    }
};

Blockly.Blocks['operator_equals'] = {
    init: function() {
        this.appendValueInput("A")
            .setCheck(null);
        this.appendValueInput("B")
            .setCheck(null)
            .appendField("=");
        this.setOutput(true, "Boolean");
        this.setColour('#7ED321'); // İşlemler
        this.setTooltip("İki değer eşit mi?");
    }
};

Blockly.Blocks['operator_and'] = {
    init: function() {
        this.appendValueInput("A")
            .setCheck("Boolean");
        this.appendValueInput("B")
            .setCheck("Boolean")
            .appendField("ve");
        this.setOutput(true, "Boolean");
        this.setColour('#7ED321'); // İşlemler
        this.setTooltip("İki koşul da doğru mu?");
    }
};

Blockly.Blocks['operator_or'] = {
    init: function() {
        this.appendValueInput("A")
            .setCheck("Boolean");
        this.appendValueInput("B")
            .setCheck("Boolean")
            .appendField("veya");
        this.setOutput(true, "Boolean");
        this.setColour('#7ED321'); // İşlemler
        this.setTooltip("Koşullardan biri doğru mu?");
    }
};

Blockly.Blocks['operator_not'] = {
    init: function() {
        this.appendValueInput("BOOL")
            .setCheck("Boolean")
            .appendField("değil");
        this.setOutput(true, "Boolean");
        this.setColour('#7ED321'); // İşlemler
        this.setTooltip("Koşulun tersini alır");
    }
};

// Değişken Blokları


// Fonksiyon Blokları
Blockly.Blocks['procedures_definition'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Fonksiyon")
            .appendField(new Blockly.FieldTextInput("fonksiyon"), "NAME");
        this.appendStatementInput("STACK")
            .setCheck(null);
        this.setColour('#D0021B'); // Bloklarım
        this.setTooltip("Yeni bir fonksiyon tanımlar");
    }
};

// LineX Özel Blokları
Blockly.Blocks['linex_fan_control'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Fan Kontrol")
            .appendField(new Blockly.FieldDropdown([
                ["Açık", "HIGH"],
                ["Kapalı", "LOW"]
            ]), "STATE");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("LineX robotunun fanını kontrol eder");
    }
};

// JavaScript üreticileri
Blockly.JavaScript.forBlock['robot_standby'] = function(block) {
    const robotType = selectedRobot;
    const state = Blockly.JavaScript.valueToCode(block, 'STATE', Blockly.JavaScript.ORDER_NONE) || 'LOW';
    // Pin sabiti adını al
    const pinLabel = 'Standby';
    const pinConst = getPinConstantFromLabel(pinLabel, robotType);
    return `digitalWrite(${pinConst}, ${state});\n`;
};

Blockly.JavaScript.forBlock['robot_fan'] = function(block) {
    const robotType = selectedRobot;
    const state = block.getFieldValue('STATE');
    const pin = robotCardPinMappings[robotType].digital['Fan Çıkışı'];
    return `digitalWrite(${pin}, ${state});\n`;
};

// Eksik kod üreticiler
Blockly.JavaScript.forBlock['operator_add'] = function(block) {
    var a = Blockly.JavaScript.valueToCode(block, 'A', Blockly.JavaScript.ORDER_ADDITION) || '0';
    var b = Blockly.JavaScript.valueToCode(block, 'B', Blockly.JavaScript.ORDER_ADDITION) || '0';
    return [`${a} + ${b}`, Blockly.JavaScript.ORDER_ADDITION];
};

Blockly.JavaScript.forBlock['operator_subtract'] = function(block) {
    var a = Blockly.JavaScript.valueToCode(block, 'A', Blockly.JavaScript.ORDER_SUBTRACTION) || '0';
    var b = Blockly.JavaScript.valueToCode(block, 'B', Blockly.JavaScript.ORDER_SUBTRACTION) || '0';
    return [`${a} - ${b}`, Blockly.JavaScript.ORDER_SUBTRACTION];
};

Blockly.JavaScript.forBlock['procedures_definition'] = function(block) {
    const funcName = block.getFieldValue('NAME');
    const statements = Blockly.JavaScript.statementToCode(block, 'STACK');
    const code = `void ${funcName}() {\n${statements}}\n`;
    return code;
};

// BURAYA EKLİYORUM
Blockly.Blocks['read_analog_pin'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Analog Pin Oku")
            .appendField(new Blockly.FieldDropdown(getAnalogIoOptionsForDropdown), "PIN");
        this.setOutput(true, null);
        this.setColour('#50E3C2'); // Giriş/Çıkış
        this.setTooltip("Analog pin değerini okur (0-1023)");
    }
};

// Değişken blokları için JavaScript üreticileri
Blockly.JavaScript.forBlock['variables_make_a_variable'] = function(block) {
    const varName = block.getFieldValue('VAR');
    return `let ${varName};\n`;
};

Blockly.JavaScript.forBlock['variables_make_a_list'] = function(block) {
    const varName = block.getFieldValue('VAR');
    return `let ${varName} = [];\n`;
};

Blockly.JavaScript.forBlock['variables_set_variable'] = function(block) {
    // Artık kod üretmiyor, tanım generateCode içinde yapılıyor.
    return '';
};

Blockly.JavaScript.forBlock['variables_change_variable_by'] = function(block) {
    const varName = block.getFieldValue('VAR');
    const sanitizedVarName = replaceTurkishChars(varName).replace(/ /g, '_');
    const value = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_NONE) || '0';
    return `${sanitizedVarName} += ${value};\n`;
};

Blockly.JavaScript.forBlock['variables_show_variable'] = function(block) {
    const varName = block.getFieldValue('VAR');
    return `Serial.print("${varName}: ");\nSerial.println(${varName});\n`;
};

// Sayı ve metin blokları
Blockly.Blocks['math_number'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldNumber(0), "NUM");
        this.setOutput(true, "Number");
        this.setColour(230);
        this.setTooltip("Sayı değeri");
    }
};

Blockly.Blocks['text'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldTextInput("metin"), "TEXT");
        this.setOutput(true, "String");
        this.setColour(160);
        this.setTooltip("Metin değeri");
    }
};

// Sayı ve metin blokları için JavaScript üreticileri
Blockly.JavaScript.forBlock['math_number'] = function(block) {
    const number = Number(block.getFieldValue('NUM'));
    return [number, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.forBlock['text'] = function(block) {
    const text = block.getFieldValue('TEXT');
    return [`"${text}"`, Blockly.JavaScript.ORDER_ATOMIC];
};

// Operatör blokları için JavaScript üreticileri
Blockly.JavaScript.forBlock['operator_equals'] = function(block) {
    const a = Blockly.JavaScript.valueToCode(block, 'A', Blockly.JavaScript.ORDER_EQUALITY) || '0';
    const b = Blockly.JavaScript.valueToCode(block, 'B', Blockly.JavaScript.ORDER_EQUALITY) || '0';
    return [`${a} == ${b}`, Blockly.JavaScript.ORDER_EQUALITY];
};

Blockly.JavaScript.forBlock['operator_gt'] = function(block) {
    const a = Blockly.JavaScript.valueToCode(block, 'A', Blockly.JavaScript.ORDER_RELATIONAL) || '0';
    const b = Blockly.JavaScript.valueToCode(block, 'B', Blockly.JavaScript.ORDER_RELATIONAL) || '0';
    return [`${a} > ${b}`, Blockly.JavaScript.ORDER_RELATIONAL];
};

Blockly.JavaScript.forBlock['operator_lt'] = function(block) {
    const a = Blockly.JavaScript.valueToCode(block, 'A', Blockly.JavaScript.ORDER_RELATIONAL) || '0';
    const b = Blockly.JavaScript.valueToCode(block, 'B', Blockly.JavaScript.ORDER_RELATIONAL) || '0';
    return [`${a} < ${b}`, Blockly.JavaScript.ORDER_RELATIONAL];
};

Blockly.JavaScript.forBlock['operator_and'] = function(block) {
    const a = Blockly.JavaScript.valueToCode(block, 'A', Blockly.JavaScript.ORDER_LOGICAL_AND) || 'false';
    const b = Blockly.JavaScript.valueToCode(block, 'B', Blockly.JavaScript.ORDER_LOGICAL_AND) || 'false';
    return [`${a} && ${b}`, Blockly.JavaScript.ORDER_LOGICAL_AND];
};

Blockly.JavaScript.forBlock['operator_or'] = function(block) {
    const a = Blockly.JavaScript.valueToCode(block, 'A', Blockly.JavaScript.ORDER_LOGICAL_OR) || 'false';
    const b = Blockly.JavaScript.valueToCode(block, 'B', Blockly.JavaScript.ORDER_LOGICAL_OR) || 'false';
    return [`${a} || ${b}`, Blockly.JavaScript.ORDER_LOGICAL_OR];
};

Blockly.JavaScript.forBlock['operator_not'] = function(block) {
    const bool = Blockly.JavaScript.valueToCode(block, 'BOOL', Blockly.JavaScript.ORDER_LOGICAL_NOT) || 'false';
    return [`!${bool}`, Blockly.JavaScript.ORDER_LOGICAL_NOT];
};

// Rastgele sayı üreteci için JavaScript üreticisi
Blockly.JavaScript.forBlock['operator_random'] = function(block) {
    let a = '0',
        b = '100';
    const aBlock = block.getInputTargetBlock('A');
    const bBlock = block.getInputTargetBlock('B');
    if (aBlock) a = Blockly.JavaScript.valueToCode(block, 'A', Blockly.JavaScript.ORDER_NONE);
    if (bBlock) b = Blockly.JavaScript.valueToCode(block, 'B', Blockly.JavaScript.ORDER_NONE);
    return [`random(${a}, ${b})`, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript.forBlock['operator_gt'] = function(block) {
    let a = '0',
        b = '0';
    const aBlock = block.getInputTargetBlock('A');
    const bBlock = block.getInputTargetBlock('B');
    if (aBlock) a = Blockly.JavaScript.valueToCode(block, 'A', Blockly.JavaScript.ORDER_RELATIONAL);
    if (bBlock) b = Blockly.JavaScript.valueToCode(block, 'B', Blockly.JavaScript.ORDER_RELATIONAL);
    return [`${a} > ${b}`, Blockly.JavaScript.ORDER_RELATIONAL];
};

Blockly.JavaScript.forBlock['operator_lt'] = function(block) {
    let a = '0',
        b = '0';
    const aBlock = block.getInputTargetBlock('A');
    const bBlock = block.getInputTargetBlock('B');
    if (aBlock) a = Blockly.JavaScript.valueToCode(block, 'A', Blockly.JavaScript.ORDER_RELATIONAL);
    if (bBlock) b = Blockly.JavaScript.valueToCode(block, 'B', Blockly.JavaScript.ORDER_RELATIONAL);
    return [`${a} < ${b}`, Blockly.JavaScript.ORDER_RELATIONAL];
};

Blockly.JavaScript.forBlock['operator_equals'] = function(block) {
    let a = '0',
        b = '0';
    const aBlock = block.getInputTargetBlock('A');
    const bBlock = block.getInputTargetBlock('B');
    if (aBlock) a = Blockly.JavaScript.valueToCode(block, 'A', Blockly.JavaScript.ORDER_EQUALITY);
    if (bBlock) b = Blockly.JavaScript.valueToCode(block, 'B', Blockly.JavaScript.ORDER_EQUALITY);
    return [`${a} == ${b}`, Blockly.JavaScript.ORDER_EQUALITY];
};

Blockly.JavaScript.forBlock['operator_and'] = function(block) {
    let a = 'false',
        b = 'false';
    const aBlock = block.getInputTargetBlock('A');
    const bBlock = block.getInputTargetBlock('B');
    if (aBlock) a = Blockly.JavaScript.valueToCode(block, 'A', Blockly.JavaScript.ORDER_LOGICAL_AND);
    if (bBlock) b = Blockly.JavaScript.valueToCode(block, 'B', Blockly.JavaScript.ORDER_LOGICAL_AND);
    return [`${a} && ${b}`, Blockly.JavaScript.ORDER_LOGICAL_AND];
};

Blockly.JavaScript.forBlock['operator_or'] = function(block) {
    let a = 'false',
        b = 'false';
    const aBlock = block.getInputTargetBlock('A');
    const bBlock = block.getInputTargetBlock('B');
    if (aBlock) a = Blockly.JavaScript.valueToCode(block, 'A', Blockly.JavaScript.ORDER_LOGICAL_OR);
    if (bBlock) b = Blockly.JavaScript.valueToCode(block, 'B', Blockly.JavaScript.ORDER_LOGICAL_OR);
    return [`${a} || ${b}`, Blockly.JavaScript.ORDER_LOGICAL_OR];
};

Blockly.JavaScript.forBlock['operator_not'] = function(block) {
    let a = 'false';
    const aBlock = block.getInputTargetBlock('BOOL');
    if (aBlock) a = Blockly.JavaScript.valueToCode(block, 'BOOL', Blockly.JavaScript.ORDER_LOGICAL_NOT);
    return [`!${a}`, Blockly.JavaScript.ORDER_LOGICAL_NOT];
};

function showAlert(title, message) {
    // Önce mevcut uyarı varsa kapat
    const modal = document.getElementById('customAlertModal');
    if (modal) modal.style.display = 'none';
    document.getElementById('customAlertTitle').textContent = title;
    document.getElementById('customAlertMessage').textContent = message;
    document.getElementById('customAlertModal').style.display = 'flex';
}

// Genel Analog Yazma Bloğu (PWM için)
const ARDUINO_PWM_PINS = ['D3', 'D5', 'D6', 'D9', 'D10', 'D11']; // Arduino Nano/Uno compatible PWM pins
Blockly.Blocks['analog_write'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Analog Pini Yaz")
            .appendField(new Blockly.FieldDropdown(getNonMotorPwmPinOptionsForDropdown), "PIN");
        this.appendValueInput("VALUE")
            .setCheck("Number")
            .appendField("değeri");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#50E3C2');
        this.setTooltip("Belirtilen analog pine PWM değeri yazar (0-255).");
    }
};

Blockly.JavaScript.forBlock['analog_write'] = function(block) {
    const robotType = selectedRobot;
    if (robotType === 'LineX') {
        console.warn(`Analog Pini Yaz bloğu LineX robotunda kullanılamaz.`);
        return ''; // LineX için boş kod döndür
    }
    const pinName = block.getFieldValue('PIN');
    const value = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_NONE) || '0';
    const pinMappings = robotCardPinMappings[robotType];
    let pin = null;

    if (pinMappings && pinMappings.digitalIO && pinMappings.digitalIO[pinName]) {
        pin = pinMappings.digitalIO[pinName];
    } else if (pinMappings && pinMappings.digital) {
        pin = pinMappings.digital[pinName];
    }

    if (!pin) {
        console.warn(`Analog Pini Yaz için pin eşleşmesi bulunamadı: ${pinName} on robot: ${robotType}`);
        return ''; // Hata durumunda boş kod döndür
    }
    const numericPin = fixPinNames(pin);
    return `analogWrite(${numericPin}, ${value});\n`;
};

// Seri Porttan Oku Bloğu
Blockly.Blocks['serial_read'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Seri Porttan Oku");
        this.setOutput(true, "Number"); // Char değeri döneceği için Number olarak ayarla
        this.setColour('#FFD700'); // Seri Port
        this.setTooltip("Seri porttan bir bayt okur (karakter olarak).");
    }
};

Blockly.JavaScript.forBlock['serial_read'] = function(block) {
    return [`Serial.read()`, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

// Seri Port Veri Mevcut Mu Bloğu
Blockly.Blocks['serial_available'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Seri Port Veri Mevcut Mu?");
        this.setOutput(true, "Boolean");
        this.setColour('#FFD700'); // Seri Port
        this.setTooltip("Seri portta okunacak veri olup olmadığını kontrol eder.");
    }
};

Blockly.JavaScript.forBlock['serial_available'] = function(block) {
    return [`Serial.available()`, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

// Değerleri Haritala Bloğu
Blockly.Blocks['math_map'] = {
    init: function() {
        this.appendValueInput("VALUE")
            .setCheck("Number")
            .appendField("değer");
        this.appendValueInput("FROM_LOW")
            .setCheck("Number")
            .appendField("aralığında")
            .appendField("en düşük");
        this.appendValueInput("FROM_HIGH")
            .setCheck("Number")
            .appendField("en yüksek");
        this.appendValueInput("TO_LOW")
            .setCheck("Number")
            .appendField("yeni aralıkta")
            .appendField("en düşük");
        this.appendValueInput("TO_HIGH")
            .setCheck("Number")
            .appendField("en yüksek");
        this.setOutput(true, "Number");
        this.setColour('#7ED321'); // İşlemler
        this.setTooltip("Bir değeri bir sayı aralığından başka bir aralığa eşler.");
        this.setHelpUrl("https://www.arduino.cc/reference/en/language/functions/math/map/");
    }
};

Blockly.JavaScript.forBlock['math_map'] = function(block) {
    let value = '0',
        fromLow = '0',
        fromHigh = '1023',
        toLow = '0',
        toHigh = '255';
    const valueBlock = block.getInputTargetBlock('VALUE');
    const fromLowBlock = block.getInputTargetBlock('FROM_LOW');
    const fromHighBlock = block.getInputTargetBlock('FROM_HIGH');
    const toLowBlock = block.getInputTargetBlock('TO_LOW');
    const toHighBlock = block.getInputTargetBlock('TO_HIGH');
    if (valueBlock) value = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_NONE);
    if (fromLowBlock) fromLow = Blockly.JavaScript.valueToCode(block, 'FROM_LOW', Blockly.JavaScript.ORDER_NONE);
    if (fromHighBlock) fromHigh = Blockly.JavaScript.valueToCode(block, 'FROM_HIGH', Blockly.JavaScript.ORDER_NONE);
    if (toLowBlock) toLow = Blockly.JavaScript.valueToCode(block, 'TO_LOW', Blockly.JavaScript.ORDER_NONE);
    if (toHighBlock) toHigh = Blockly.JavaScript.valueToCode(block, 'TO_HIGH', Blockly.JavaScript.ORDER_NONE);
    return [`map(${value}, ${fromLow}, ${fromHigh}, ${toLow}, ${toHigh})`, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

// Değerleri Kısıtla Bloğu
Blockly.Blocks['math_constrain'] = {
    init: function() {
        this.appendValueInput("VALUE")
            .setCheck("Number")
            .appendField("değer");
        this.appendValueInput("LOW")
            .setCheck("Number")
            .appendField("kısıtla en az");
        this.appendValueInput("HIGH")
            .setCheck("Number")
            .appendField("en fazla");
        this.setOutput(true, "Number");
        this.setColour('#7ED321'); // İşlemler
        this.setTooltip("Bir değeri belirtilen aralıkta tutar.");
        this.setHelpUrl("https://www.arduino.cc/reference/en/language/functions/math/constrain/");
    }
};

Blockly.JavaScript.forBlock['math_constrain'] = function(block) {
    const value = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_NONE) || '0';
    const low = Blockly.JavaScript.valueToCode(block, 'LOW', Blockly.JavaScript.ORDER_NONE) || '0';
    const high = Blockly.JavaScript.valueToCode(block, 'HIGH', Blockly.JavaScript.ORDER_NONE) || '255';
    const code = `constrain(${value}, ${low}, ${high})`;
    return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

// Mutlak Değer Bloğu
Blockly.Blocks['math_abs'] = {
    init: function() {
        this.appendValueInput("VALUE")
            .setCheck("Number")
            .appendField("mutlak değer");
        this.setOutput(true, "Number");
        this.setColour('#7ED321'); // İşlemler
        this.setTooltip("Bir sayının mutlak değerini döndürür.");
        this.setHelpUrl("https://www.arduino.cc/reference/en/language/functions/math/abs/");
    }
};

Blockly.JavaScript.forBlock['math_abs'] = function(block) {
    const value = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_NONE) || '0';
    const code = `abs(${value})`;
    return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

// Minimum Bloğu
Blockly.Blocks['math_min'] = {
    init: function() {
        this.appendValueInput("A")
            .setCheck("Number")
            .appendField("min");
        this.appendValueInput("B")
            .setCheck("Number")
            .appendField("ve");
        this.setInputsInline(true);
        this.setOutput(true, "Number");
        this.setColour('#7ED321'); // İşlemler
        this.setTooltip("İki sayıdan küçük olanı döndürür.");
        this.setHelpUrl("https://www.arduino.cc/reference/en/language/functions/math/min/");
    }
};

Blockly.JavaScript.forBlock['math_min'] = function(block) {
    const a = Blockly.JavaScript.valueToCode(block, 'A', Blockly.JavaScript.ORDER_NONE) || '0';
    const b = Blockly.JavaScript.valueToCode(block, 'B', Blockly.JavaScript.ORDER_NONE) || '0';
    const code = `min(${a}, ${b})`;
    return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

// Maksimum Bloğu
Blockly.Blocks['math_max'] = {
    init: function() {
        this.appendValueInput("A")
            .setCheck("Number")
            .appendField("max");
        this.appendValueInput("B")
            .setCheck("Number")
            .appendField("ve");
        this.setInputsInline(true);
        this.setOutput(true, "Number");
        this.setColour('#7ED321'); // İşlemler
        this.setTooltip("İki sayıdan büyük olanı döndürür.");
        this.setHelpUrl("https://www.arduino.cc/reference/en/language/functions/math/max/");
    }
};

Blockly.JavaScript.forBlock['math_max'] = function(block) {
    const a = Blockly.JavaScript.valueToCode(block, 'A', Blockly.JavaScript.ORDER_NONE) || '0';
    const b = Blockly.JavaScript.valueToCode(block, 'B', Blockly.JavaScript.ORDER_NONE) || '0';
    const code = `max(${a}, ${b})`;
    return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

// Yardımcı fonksiyonlar (pin seçenekleri için)
function getDigitalPinOptions() {
    const robotType = selectedRobot || 'MazeX';
    const pinMappings = robotCardPinMappings[robotType];
    let digitalPins = {};
    if (pinMappings) {
        if (pinMappings.digital) {
            digitalPins = pinMappings.digital;
        } else if (pinMappings.digitalIO) { // For VivianX
            digitalPins = pinMappings.digitalIO;
        }
    }
    // Exclude 'Standby' and 'Fan Çıkışı' for specific robots if they are defined as digital outputs
    return Object.entries(digitalPins || {}).filter(([name, pin]) => name !== 'Standby' && name !== 'Fan Çıkışı').map(([name, pin]) => [name, pin]);
}

function getAnalogPinOptions() {
    const robotType = selectedRobot || 'MazeX';
    const pinMappings = robotCardPinMappings[robotType];
    let analogPins = {};
    if (pinMappings) {
        if (pinMappings.sensors) { // For MazeX and LineX
            analogPins = pinMappings.sensors;
        } else if (pinMappings.analogIO) { // For VivianX
            analogPins = pinMappings.analogIO;
        }
    }
    return Object.entries(analogPins || {}).filter(([name, pin]) => pin.startsWith('A')).map(([name, pin]) => [name, pin]);
}

// Yeni fonksiyonlar: FieldDropdown için dinamik seçenekler sağlamak üzere
function getSensorOptionsForDropdown() {
    return getAnalogPinOptions().map(([name, pin]) => [name, name]).filter(([name, value]) => name !== 'Standby');
}

function getDigitalInputPinOptionsForDropdown() {
    return getDigitalInputPinOptions().map(([name, pin]) => [name, name]);
}

function getDigitalOutputPinOptionsForDropdown() {
    return getDigitalOutputPinOptions().map(([name, pin]) => [name, name]);
}

// VivianX Motor Hız Ayarlama Bloğu
Blockly.Blocks['vivianx_set_motor_speed'] = {
    init: function() {
        const motorOptions = Object.entries(robotCardPinMappings['VivianX'].motors).map(([name, pins]) => [name, name]);
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown(motorOptions), "MOTOR_NAME")
            .appendField("hızını ayarla");
        this.appendValueInput("SPEED")
            .setCheck("Number")
            .appendField("hız");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#F5A623'); // Çevre Birimleri (VivianX)
        this.setTooltip("VivianX robotunun motor hızını ayarlar (0-255).");
    }
};

Blockly.JavaScript.forBlock['vivianx_set_motor_speed'] = function(block) {
    const motorName = block.getFieldValue('MOTOR_NAME');
    const speed = Blockly.JavaScript.valueToCode(block, 'SPEED', Blockly.JavaScript.ORDER_NONE) || '0';
    const motorPins = robotCardPinMappings['VivianX'].motors[motorName];
    // pin numarasını alırken D'yi kaldır
    const pwmPin = fixPinNames(motorPins.pwm);
    const dirPin = fixPinNames(motorPins.dir);
    const code = `
    analogWrite(${pwmPin}, ${speed});
    digitalWrite(${dirPin}, HIGH); // Yön varsayılan olarak ileri
    `;
    return code;
};

// Bluetooth Veri Gönderme Bloğu
Blockly.Blocks['bluetooth_send_data'] = {
    init: function() {
        this.appendValueInput("DATA")
            .setCheck(["Number", "String"])
            .appendField("Bluetooth veri gönder");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#E64C4C'); // Çevre Birimleri (VivianX)
        this.setTooltip("Bluetooth modülü üzerinden veri gönderir.");
    }
};

Blockly.JavaScript.forBlock['bluetooth_send_data'] = function(block) {
    const data = Blockly.JavaScript.valueToCode(block, 'DATA', Blockly.JavaScript.ORDER_NONE) || '""';
    if (selectedRobot === 'VivianX') {
        return `// Bluetooth veri gönder: ${data}\n`;
    }
    return `Serial.print(${data});\n`;
};

// OLED Metin Yazma Bloğu
Blockly.Blocks['oled_print_text'] = {
    init: function() {
        this.appendValueInput("TEXT")
            .setCheck(["Number", "String"])
            .appendField("OLED'e yaz");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#E64C4C'); // Çevre Birimleri (VivianX)
        this.setTooltip("OLED ekrana metin veya sayı yazar.");
    }
};

Blockly.JavaScript.forBlock['oled_print_text'] = function(block) {
    const text = Blockly.JavaScript.valueToCode(block, 'TEXT', Blockly.JavaScript.ORDER_NONE) || ' ';
    if (selectedRobot === 'VivianX') {
        return `// OLED'e yaz: ${text}\n`;
    }
    const code = `display.println(${text});\ndisplay.display();\n`;
    return code;
};

Blockly.Blocks['write_digital_pin'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Dijital Pini Yaz")
            .appendField(new Blockly.FieldDropdown(getDigitalOutputPinOptionsForDropdown), "PIN");
        this.appendValueInput("VALUE")
            .setCheck("Number")
            .appendField("değeri");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#50E3C2'); // Giriş/Çıkış
        this.setTooltip("Belirtilen dijital pine YÜKSEK veya DÜŞÜK değerini yazar.");
    }
};

Blockly.JavaScript.forBlock['write_digital_pin'] = function(block) {
    const pinLabel = block.getFieldValue('PIN');
    const value = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_NONE) || '0';
    const robotType = selectedRobot;
    const pinConst = getPinConstantFromLabel(pinLabel, robotType);
    return `digitalWrite(${pinConst}, ${value});\n`;
};

// Analog Yaz Bloğu (isim değiştirilecek)
Blockly.Blocks['write_analog_pin'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Pwm Yaz")
            .appendField(new Blockly.FieldDropdown(getNonMotorPwmPinOptionsForDropdown), "PIN");
        this.appendValueInput("VALUE")
            .setCheck("Number")
            .appendField("değeri");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#50E3C2');
        this.setTooltip("Belirtilen pwm pine PWM değeri yazar (0-255).");
    }
};

Blockly.JavaScript.forBlock['write_analog_pin'] = function(block) {
    const pinName = block.getFieldValue('PIN');
    const robotType = selectedRobot || 'MazeX';
    let pin = null;

    if (robotType === 'MazeX' && pinName === 'D9') {
        pin = 'D9';
    } else if (robotType && robotCardPinMappings[robotType]) {
        const currentPinMappings = robotCardPinMappings[robotType];
        if (robotType === 'MazeX' || robotType === 'LineX') {
            if (currentPinMappings.motors && currentPinMappings.motors[pinName]) {
                pin = currentPinMappings.motors[pinName];
            } else if (currentPinMappings.digital && currentPinMappings.digital[pinName]) {
                pin = currentPinMappings.digital[pinName];
            }
        } else if (robotType === 'VivianX') {
            if (currentPinMappings.motors && currentPinMappings.motors[pinName]) {
                pin = currentPinMappings.motors[pinName].pwm;
            }
        }
    }

    if (!pin) {
        console.warn(`Pin mapping not found for analog (PWM) pin: ${pinName} on robot: ${robotType}`);
        return ''; // Hata durumunda boş kod döndür
    }
    // Pin ismini sayıya dönüştür
    const numericPin = fixPinNames(pin);
    const value = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_NONE) || '0';
    return `analogWrite(${numericPin}, ${value});\n`;
};

Blockly.Blocks['nrf24_send_data'] = {
    init: function() {
        this.appendValueInput("DATA")
            .setCheck(["Number", "String"])
            .appendField("NRF24 veri gönder");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#E64C4C'); // Çevre Birimleri (VivianX)
        this.setTooltip("NRF24 modülü üzerinden veri gönderir.");
    }
};

Blockly.JavaScript.forBlock['nrf24_send_data'] = function(block) {
    const data = Blockly.JavaScript.valueToCode(block, 'DATA', Blockly.JavaScript.ORDER_NONE) || '""';
    if (selectedRobot === 'VivianX') {
        return `// NRF24 veri gönder: ${data}\n`;
    }
    return `\n    // NRF24 başlatma\n    Serial.println("AT+NRF24=1"); // NRF24 modülünü başlat\n    delay(100);\n    Serial.println("AT+NRF24CH=76"); // Kanal seçimi\n    delay(100);\n    Serial.println("AT+NRF24PA=3"); // Güç seviyesi (0-3)\n    delay(100);\n    Serial.println("AT+NRF24SEND=" + ${data}); // Veri gönder\n    delay(100);\n    `;
};

Blockly.Blocks['esp01_send_data'] = {
    init: function() {
        this.appendValueInput("DATA")
            .setCheck(["Number", "String"])
            .appendField("ESP01 veri gönder");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#E64C4C'); // Çevre Birimleri (VivianX)
        this.setTooltip("ESP01 modülü üzerinden veri gönderir.");
    }
};

Blockly.JavaScript.forBlock['esp01_send_data'] = function(block) {
    const data = Blockly.JavaScript.valueToCode(block, 'DATA', Blockly.JavaScript.ORDER_NONE) || '""';
    if (selectedRobot === 'VivianX') {
        return `// ESP01 veri gönder: ${data}\n`;
    }
    return `\n    // ESP01 başlatma\n    Serial.println("AT"); // Test komutu\n    delay(100);\n    Serial.println("AT+CWMODE=1"); // Station modu\n    delay(100);\n    Serial.println("AT+CWJAP=\"SSID\",\"PASSWORD\""); // WiFi bağlantısı\n    delay(5000);\n    Serial.println("AT+CIPSTART=\"TCP\",\"SERVER\",PORT"); // TCP bağlantısı\n    delay(1000);\n    Serial.println("AT+CIPSEND=" + ${data}.length); // Veri gönder\n    delay(100);\n    Serial.println(${data});\n    delay(100);\n    `;
};

Blockly.Blocks['esp01_wifi_setup'] = {
    init: function() {
        this.appendValueInput("SSID")
            .setCheck("String")
            .appendField("WiFi Ağı");
        this.appendValueInput("PASSWORD")
            .setCheck("String")
            .appendField("Şifre");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#E64C4C'); // Çevre Birimleri (VivianX)
        this.setTooltip("ESP01 WiFi bağlantı ayarları");
    }
};

Blockly.Blocks['esp01_tcp_setup'] = {
    init: function() {
        this.appendValueInput("SERVER")
            .setCheck("String")
            .appendField("Sunucu Adresi");
        this.appendValueInput("PORT")
            .setCheck("Number")
            .appendField("Port");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#E64C4C'); // Çevre Birimleri (VivianX)
        this.setTooltip("ESP01 TCP bağlantı ayarları");
    }
};

Blockly.Blocks['esp01_check_connection'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Bağlantıyı Kontrol Et");
        this.setOutput(true, "Boolean");
        this.setColour('#E64C4C'); // Çevre Birimleri (VivianX)
        this.setTooltip("ESP01 bağlantı durumunu kontrol eder");
    }
};

Blockly.JavaScript.forBlock['esp01_wifi_setup'] = function(block) {
    const ssid = Blockly.JavaScript.valueToCode(block, 'SSID', Blockly.JavaScript.ORDER_NONE) || '""';
    const password = Blockly.JavaScript.valueToCode(block, 'PASSWORD', Blockly.JavaScript.ORDER_NONE) || '""';
    if (selectedRobot === 'VivianX') {
        return `// ESP01 WiFi Setup: SSID=${ssid}, Şifre=${password}\n`;
    }
    return `\n    Serial.println("AT+CWMODE=1");\n    delay(100);\n    Serial.println("AT+CWJAP=" + ${ssid} + "," + ${password});\n    delay(5000);\n    `;
};

Blockly.JavaScript.forBlock['esp01_tcp_setup'] = function(block) {
    const server = Blockly.JavaScript.valueToCode(block, 'SERVER', Blockly.JavaScript.ORDER_NONE) || '""';
    const port = Blockly.JavaScript.valueToCode(block, 'PORT', Blockly.JavaScript.ORDER_NONE) || '80';
    if (selectedRobot === 'VivianX') {
        return `// ESP01 TCP Setup: Sunucu=${server}, Port=${port}\n`;
    }
    return `\n    Serial.println("AT+CIPSTART=\"TCP\"," + ${server} + "," + ${port});\n    delay(1000);\n    `;
};

Blockly.JavaScript.forBlock['esp01_check_connection'] = function(block) {
    if (selectedRobot === 'VivianX') {
        return [`// ESP01 Bağlantı Kontrol`, Blockly.JavaScript.ORDER_FUNCTION_CALL];
    }
    return [
        `(Serial.find("OK") != -1)`,
        Blockly.JavaScript.ORDER_FUNCTION_CALL
    ];
};

Blockly.Blocks['nrf24_init'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("NRF24 Başlat");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#E64C4C'); // Çevre Birimleri (VivianX)
        this.setTooltip("NRF24 modülünü başlatır");
    }
};

Blockly.Blocks['nrf24_set_channel'] = {
    init: function() {
        this.appendValueInput("CHANNEL")
            .setCheck("Number")
            .appendField("NRF24 Kanal Ayarla");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#E64C4C'); // Çevre Birimleri (VivianX)
        this.setTooltip("NRF24 kanal ayarı (0-125)");
    }
};

Blockly.Blocks['nrf24_set_power'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("NRF24 Güç Seviyesi")
            .appendField(new Blockly.FieldDropdown([
                ["Minimum", "0"],
                ["Düşük", "1"],
                ["Orta", "2"],
                ["Maksimum", "3"]
            ]), "POWER");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#E64C4C'); // Çevre Birimleri (VivianX)
        this.setTooltip("NRF24 güç seviyesi ayarı");
    }
};

Blockly.Blocks['esp01_test'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("ESP01 Test");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#E64C4C'); // Çevre Birimleri (VivianX)
        this.setTooltip("ESP01 modülünü test eder");
    }
};

Blockly.Blocks['esp01_set_mode'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("ESP01 Mod")
            .appendField(new Blockly.FieldDropdown([
                ["Station", "1"],
                ["AP", "2"],
                ["Station+AP", "3"]
            ]), "MODE");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#E64C4C'); // Çevre Birimleri (VivianX)
        this.setTooltip("ESP01 çalışma modu ayarı");
    }
};

Blockly.JavaScript.forBlock['nrf24_init'] = function(block) {
    if (selectedRobot === 'VivianX') {
        return `// NRF24 Başlat\n`;
    }
    return `Serial.println("AT+NRF24=1");\ndelay(100);\n`;
};

Blockly.JavaScript.forBlock['nrf24_set_channel'] = function(block) {
    const channel = Blockly.JavaScript.valueToCode(block, 'CHANNEL', Blockly.JavaScript.ORDER_NONE) || '76';
    if (selectedRobot === 'VivianX') {
        return `// NRF24 Kanal Ayarla: ${channel}\n`;
    }
    return `Serial.println("AT+NRF24CH=" + ${channel});\ndelay(100);\n`;
};

Blockly.JavaScript.forBlock['nrf24_set_power'] = function(block) {
    const power = block.getFieldValue('POWER');
    if (selectedRobot === 'VivianX') {
        return `// NRF24 Güç Seviyesi: ${power}\n`;
    }
    return `Serial.println("AT+NRF24PA=" + ${power});\ndelay(100);\n`;
};

Blockly.JavaScript.forBlock['esp01_test'] = function(block) {
    if (selectedRobot === 'VivianX') {
        return `// ESP01 Test\n`;
    }
    return `Serial.println("AT");\ndelay(100);\n`;
};

Blockly.JavaScript.forBlock['esp01_set_mode'] = function(block) {
    const mode = block.getFieldValue('MODE');
    if (selectedRobot === 'VivianX') {
        return `// ESP01 Mod: ${mode}\n`;
    }
    return `Serial.println("AT+CWMODE=" + ${mode});\ndelay(100);\n`;
};

Blockly.Blocks['motor_control'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Motor")
            .appendField(new Blockly.FieldDropdown([
                ["Motor 1", "MOTOR1"],
                ["Motor 2", "MOTOR2"]
            ]), "MOTOR");
        this.appendDummyInput()
            .appendField("İşlem")
            .appendField(new Blockly.FieldDropdown([
                ["İleri", "FORWARD"],
                ["Geri", "BACKWARD"],
                ["Durdur", "STOP"],
                ["Fren", "BRAKE"]
            ]), "ACTION");
        this.appendValueInput("SPEED")
            .setCheck("Number")
            .appendField("Hız");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#E64C4C'); // Çevre Birimleri (VivianX)
        this.setTooltip("Motor kontrolü");
    }
};

Blockly.JavaScript.forBlock['motor_control'] = function(block) {
    var motor = block.getFieldValue('MOTOR');
    var action = block.getFieldValue('ACTION');
    var speed = Blockly.JavaScript.valueToCode(block, 'SPEED', Blockly.JavaScript.ORDER_ATOMIC) || '0';

    var code = '';
    if (action === 'STOP') {
        // TB6612 için: IN1=0, IN2=0, PWM=0
        // BTS7960 için: R_EN=0, L_EN=0, RPWM=0, LPWM=0
        code = `digitalWrite(${motor}_IN1, 0);\n`;
        code += `digitalWrite(${motor}_IN2, 0);\n`;
        code += `analogWrite(${motor}_PWM, 0);\n`;
    } else if (action === 'BRAKE') {
        // TB6612 için: IN1=1, IN2=1, PWM=0
        // BTS7960 için: R_EN=1, L_EN=1, RPWM=0, LPWM=0
        code = `digitalWrite(${motor}_IN1, 1);\n`;
        code += `digitalWrite(${motor}_IN2, 1);\n`;
        code += `analogWrite(${motor}_PWM, 0);\n`;
    } else {
        // TB6612 için: STBY=1, IN1/IN2 ve PWM ayarları
        // BTS7960 için: R_EN/L_EN ve RPWM/LPWM ayarları
        code = `digitalWrite(${motor}_STBY, 1);\n`;
        if (action === 'FORWARD') {
            code += `digitalWrite(${motor}_IN1, 1);\n`;
            code += `digitalWrite(${motor}_IN2, 0);\n`;
        } else {
            code += `digitalWrite(${motor}_IN1, 0);\n`;
            code += `digitalWrite(${motor}_IN2, 1);\n`;
        }
        code += `analogWrite(${motor}_PWM, ${speed});\n`;
    }
    return code;
};

// Console Output'a mesaj yazan fonksiyon
function appendConsoleOutput(message, type = 'info') {
    const consoleOutput = document.getElementById('consoleOutput');
    if (!consoleOutput) return;
    const timestamp = new Date().toLocaleTimeString();
    const logMessage = document.createElement('div');
    logMessage.innerHTML = `<span style="color: #888">[${timestamp}]</span> <span style="color: ${type === 'error' ? '#ff6b6b' : type === 'success' ? '#51cf66' : '#339af0'}">${message}</span>`;
    logMessage.style.cursor = 'pointer';
    logMessage.title = 'Kopyalamak için tıklayın';
    logMessage.addEventListener('click', function() {
        // Sadece mesaj kısmını kopyala
        const textToCopy = logMessage.innerText;
        navigator.clipboard.writeText(textToCopy).then(() => {
            showAlert('Kopyalandı', 'Satır panoya kopyalandı!');
        });
    });
    consoleOutput.appendChild(logMessage);
    consoleOutput.scrollTop = consoleOutput.scrollHeight;
}

// Yeni fonksiyon: Analog I/O pinleri için dinamik seçenekler sağlamak üzere
function getAnalogIoOptionsForDropdown() {
    const robotType = selectedRobot || 'MazeX';
    if (robotType === 'VivianX') {
        // Sadece A0-A7 pinlerini döndür
        return [
            ['A0', 'A0'],
            ['A1', 'A1'],
            ['A2', 'A2'],
            ['A3', 'A3'],
            ['A4', 'A4'],
            ['A5', 'A5'],
            ['A6', 'A6'],
            ['A7', 'A7']
        ];
    }
    if (robotType === 'LineX') {
        // S1-S8 olarak göster
        return [
            ['S1', 'S1'],
            ['S2', 'S2'],
            ['S3', 'S3'],
            ['S4', 'S4'],
            ['S5', 'S5'],
            ['S6', 'S6'],
            ['S7', 'S7'],
            ['S8', 'S8']
        ];
    }
    if (robotType === 'MazeX') {
        return [
            ['Ön Sensör', 'Ön Sensör'],
            ['Sağ Sensör', 'Sağ Sensör'],
            ['Sol Sensör', 'Sol Sensör'],
            ['Sağ Çapraz Sensör', 'Sağ Çapraz Sensör'],
            ['Sol Çapraz Sensör', 'Sol Çapraz Sensör'],
            ['A6', 'A6'],
            ['A7', 'A7']
        ];
    }
    const pinMappings = robotCardPinMappings[robotType];
    let analogIoPins = {};
    if (pinMappings) {
        if (pinMappings.sensors) {
            analogIoPins = pinMappings.sensors;
        } else if (pinMappings.analogIO) {
            analogIoPins = pinMappings.analogIO;
        }
    }
    const options = Object.entries(analogIoPins || {}).map(([name, pin]) => [name, name]);
    if (options.length === 0) {
        return [
            ['', '']
        ];
    }
    return options;
}

// Yeni fonksiyon: PWM pinleri için dinamik seçenekler sağlamak üzere
function getPwmPinOptionsForDropdown() {
    const robotType = selectedRobot || 'MazeX';
    const pinMappings = robotCardPinMappings[robotType];
    let pwmPins = [];

    if (robotType === 'MazeX' || robotType === 'LineX') {
        if (pinMappings.motors) {
            for (const key in pinMappings.motors) {
                if (key.includes('PWM')) {
                    pwmPins.push([key, key]);
                }
            }
        }
        if (pinMappings.digital) {
            if (pinMappings.digital['Fan Çıkışı']) {
                pwmPins.push(['Fan', 'Fan Çıkışı']);
            }
        }
        pwmPins = pwmPins.filter(([name, value]) =>
            name !== 'Start Butonu' &&
            !name.startsWith('Dip Switch') &&
            !name.includes('Sensör')
        );
    } else if (robotType === 'VivianX') {
        // Sadece analogIO ve digitalIO pinleri (motor pinleri hariç)
        pwmPins = [
            ...Object.entries(pinMappings.analogIO || {}),
            ...Object.entries(pinMappings.digitalIO || {})
        ];
    }
    const uniquePwmPins = Array.from(new Map(pwmPins.map(item => [item[1], item])).values());
    return uniquePwmPins.map(([name, pin]) => [simplifyPinName(name), pin]);
}

function getNonMotorPwmPinOptionsForDropdown() {
    const robotType = selectedRobot || 'MazeX';
    if (robotType === 'MazeX') {
        return [
            ['D9', 'D9']
        ];
    }
    const pinMappings = robotCardPinMappings[robotType];
    const options = [];
    // Motor PWM pinlerini al
    const motorPwmPins = new Set();
    if (pinMappings && pinMappings.motors) {
        for (const motorName in pinMappings.motors) {
            if (typeof pinMappings.motors[motorName] === 'string') {
                if (ARDUINO_PWM_PINS.includes(pinMappings.motors[motorName])) {
                    motorPwmPins.add(pinMappings.motors[motorName]);
                }
            } else if (typeof pinMappings.motors[motorName] === 'object') {
                // VivianX için
                if (pinMappings.motors[motorName].pwm1 && ARDUINO_PWM_PINS.includes(pinMappings.motors[motorName].pwm1)) {
                    motorPwmPins.add(pinMappings.motors[motorName].pwm1);
                }
                if (pinMappings.motors[motorName].pwm2 && ARDUINO_PWM_PINS.includes(pinMappings.motors[motorName].pwm2)) {
                    motorPwmPins.add(pinMappings.motors[motorName].pwm2);
                }
            }
        }
    }
    // Sadece PWM çıkışı verebilen ve motor için kullanılmayan pinleri ekle
    for (const pin of ARDUINO_PWM_PINS) {
        if (!motorPwmPins.has(pin)) {
            options.push([pin, pin]);
        }
    }

    if (options.length === 0) {
        return [
            ['', '']
        ];
    }

    return options;
}

function simplifyPinName(name) {
    // MazeX için kısaltmasız isimler
    if (selectedRobot === 'MazeX') {
        return name
            .replace(/^Sg Sensör$/, 'Sağ Sensör')
            .replace(/^Sl Sensör$/, 'Sol Sensör')
            .replace(/^Sg Çapraz Sensör$/, 'Sağ Çapraz Sensör')
            .replace(/^Sl Çapraz Sensör$/, 'Sol Çapraz Sensör');
    }
    return name
        .replace(/^Fan Çıkışı$/, 'Fan')
        .replace(/^Start Butonu$/, 'Start')
        .replace(/^Analog /, '')
        .replace(/^Dijital /, '')
        .replace(/ Butonu$/, '')
        .replace(/ Çıkışı$/, '')
        .replace(/^Çizgi Sensör /, 'S') // ör: Çizgi Sensör 1 -> S1
        .replace(/^Ön Mesafe Sensörü$/, 'Mesafe')
        .replace(/^Dip Switch /, 'Dip')
        .replace(/^Yedek Çıkış /, 'Yedek')
        .replace(/^Sağ /, 'Sg ')
        .replace(/^Sol /, 'Sl ')
        .replace(/^Zemin Sensör$/, 'Zemin')
        .replace(/^Standby$/, 'Standby');
}

function getDigitalInputPinOptions() {
    const robotType = selectedRobot || 'MazeX';
    const pinMappings = robotCardPinMappings[robotType];
    let inputPins = [];
    if (robotType === 'MazeX' || robotType === 'LineX') {
        inputPins = [
            ...Object.entries(pinMappings.sensors || {}).filter(([name, pin]) => name !== 'Boş' && pin !== 'A6' && pin !== 'A7'),
            ...Object.entries(pinMappings.digital || {}).filter(([name]) => name === 'Start Butonu' || name.startsWith('Dip Switch')),
            ...Object.entries(pinMappings.sensors || {}).filter(([name, pin]) => name === 'Boş' && pin !== 'A6' && pin !== 'A7').map(([_, pin]) => [pin, pin]),
            ...Object.entries(pinMappings.digital || {}).filter(([name]) => name === 'Boş').map(([_, pin]) => [pin, pin]),
            // D8, D4, D7 pinlerini manuel ekle
            ['D8', 'D8'],
            ['D4', 'D4'],
            ['D7', 'D7']
        ];
        // MazeX için sensör isimlerini kısaltmasız göster
        if (robotType === 'MazeX') {
            return inputPins.map(([name, pin]) => {
                let displayName = name
                    .replace(/^Sg Sensör$/, 'Sağ Sensör')
                    .replace(/^Sl Sensör$/, 'Sol Sensör')
                    .replace(/^Sg Çapraz Sensör$/, 'Sağ Çapraz Sensör')
                    .replace(/^Sl Çapraz Sensör$/, 'Sol Çapraz Sensör');
                return [displayName, pin];
            });
        }
        return inputPins.map(([name, pin]) => [simplifyPinName(name), pin]);
    }
    // VivianX için tabloya göre özel pin listesi
    return [
        ['D2 (NRF)', 'D2'],
        ['D3 (NRF)', 'D3'],
        ['D11', 'D11'],
        ['D12', 'D12'],
        ['A0', 'A0'],
        ['A1', 'A1'],
        ['A2', 'A2'],
        ['A3', 'A3'],
        ['A4', 'A4'],
        ['A5', 'A5'],
        ['D0', 'D0'],
        ['D1', 'D1'],
        ['Start Butonu', 'D8'],
        ['Dip Switch 1', 'D4'],
        ['Dip Switch 2', 'D7']
    ];
}

function getDigitalOutputPinOptions() {
    const robotType = selectedRobot || 'MazeX';
    const pinMappings = robotCardPinMappings[robotType];
    let outputPins = [];
    if (robotType === 'MazeX' || robotType === 'LineX') {
        outputPins = [
            ...Object.entries(pinMappings.digital || {}).filter(([name]) => name === 'Fan Çıkışı' || name.startsWith('Yedek Çıkış')), // Standby kaldırıldı
            ...Object.entries(pinMappings.sensors || {}).filter(([name, pin]) => name === 'Boş' && pin !== 'A6' && pin !== 'A7').map(([_, pin]) => [pin, pin]),
            ...Object.entries(pinMappings.digital || {}).filter(([name]) => name === 'Boş').map(([_, pin]) => [pin, pin])
        ];
        // Eğer hiç pin yoksa, D9'u ekle
        if (outputPins.length === 0) {
            outputPins.push(['D9', 'D9']);
        }
    } else if (robotType === 'VivianX') {
        outputPins = [
            ...Object.entries(pinMappings.analogIO || {}),
            ...Object.entries(pinMappings.digitalIO || {}), ['D0', 'D0'],
            ['D1', 'D1']
        ];
    }
    return outputPins.map(([name, pin]) => [simplifyPinName(name), pin]);
}

// HIGH/LOW seçimi için özel blok
Blockly.Blocks['logic_high_low'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([
                ['HIGH', 'HIGH'],
                ['LOW', 'LOW']
            ]), 'STATE');
        this.setOutput(true, null);
        this.setColour('#50E3C2');
        this.setTooltip('HIGH veya LOW değeri döndürür.');
    }
};

Blockly.JavaScript.forBlock['logic_high_low'] = function(block) {
    const state = block.getFieldValue('STATE');
    return [state, Blockly.JavaScript.ORDER_ATOMIC];
};

// Seri Haberleşme Başlat Bloğu
Blockly.Blocks['serial_begin'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Seri Haberleşmeyi Başlat")
            .appendField(new Blockly.FieldDropdown([
                ["300", "300"],
                ["600", "600"],
                ["1200", "1200"],
                ["2400", "2400"],
                ["4800", "4800"],
                ["9600", "9600"],
                ["14400", "14400"],
                ["19200", "19200"],
                ["28800", "28800"],
                ["31250", "31250"],
                ["38400", "38400"],
                ["57600", "57600"],
                ["115200", "115200"]
            ]), "BAUD")
            .appendField("bps");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#FFD700'); // Seri Port
        this.setTooltip("Seri portu belirtilen baud rate ile başlatır");
    }
};

Blockly.JavaScript.forBlock['serial_begin'] = function(block) {
    const baud = block.getFieldValue('BAUD') || '9600';
    return `Serial.begin(${baud});\n`;
};

// Zaman Blokları
Blockly.Blocks['delay_microseconds'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Bekle");
        this.appendValueInput("SÜRE")
            .setCheck('Number')
            .appendField("µs");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#FF6680');
        this.setTooltip("Belirtilen süre kadar bekler (mikrosaniye)");
    }
};
Blockly.JavaScript.forBlock['delay_microseconds'] = function(block) {
    const sure = Blockly.JavaScript.valueToCode(block, 'SÜRE', Blockly.JavaScript.ORDER_NONE) || '0';
    return `delayMicroseconds(${sure});\n`;
};

Blockly.Blocks['millis'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Geçen Süre (ms)");
        this.setOutput(true, 'Number');
        this.setColour('#FF6680');
        this.setTooltip("Program başından itibaren geçen süreyi milisaniye cinsinden verir");
    }
};
Blockly.JavaScript.forBlock['millis'] = function(block) {
    return ['millis()', Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.Blocks['micros'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Geçen Süre (µs)");
        this.setOutput(true, 'Number');
        this.setColour('#FF6680');
        this.setTooltip("Program başından itibaren geçen süreyi mikrosaniye cinsinden verir");
    }
};
Blockly.JavaScript.forBlock['micros'] = function(block) {
    return ['micros()', Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.Blocks['wait_forever'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Sonsuz Bekle (programı bitir)");
        this.setPreviousStatement(true, null);
        this.setColour('#FF6680');
        this.setTooltip("Programı sonsuza kadar durdurur");
    }
};
Blockly.JavaScript.forBlock['wait_forever'] = function(block) {
    return 'while(1);\n';
};

// Zaman kategorisini toolbox'a ekle
function getTimeCategoryXml() {
    return `
        <category name="Zaman" colour="#FF6680">
            <block type="robot_bekle"></block>
            <block type="delay_microseconds"></block>
            <block type="millis"></block>
            <block type="micros"></block>
            <block type="wait_forever"></block>
        </category>
    `;
}

// Her robotun toolbox'una Zaman kategorisini ekle
for (const robot in robotCardToolboxes) {
    robotCardToolboxes[robot] = robotCardToolboxes[robot].replace('<xml>', `<xml>${getTimeCategoryXml()}`);
}

// Yeni değişken blokları
Blockly.Blocks['variables_get'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldVariable("değişken"), "VAR");
        this.setOutput(true, null);
        this.setColour('#9013FE');
        this.setTooltip("Değişkenin değerini döndürür");
    }
};

Blockly.Blocks['variables_set'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Ata");
        this.appendValueInput("VARNAME")
            .setCheck("String")
            .appendField("değişken ismi");
        this.appendValueInput("VALUE")
            .setCheck(null)
            .appendField("değeri");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#9013FE');
        this.setTooltip("Değişkene değer atar");
    }
};

Blockly.Blocks['variables_set_typed'] = {
    init: function() {
        this.appendValueInput("VARNAME")
            .setCheck("String")
            .appendField("Ata değişken ismi");
        this.appendValueInput("VALUE")
            .appendField("değeri");
        this.appendDummyInput()
            .appendField("olarak")
            .appendField(new Blockly.FieldDropdown([
                ["Karakter", "char"],
                ["Sayı", "number"],
                ["Metin", "string"],
                ["Zaman", "unsigned_long"],
                ["Mantıksal", "bool"]
            ]), "TYPE");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#9013FE');
        this.setTooltip("Değişkene tip seçerek değer atar");
    }
};

// Değişkenler kategorisini güncelle
for (const robot in robotCardToolboxes) {
    robotCardToolboxes[robot] = robotCardToolboxes[robot].replace(
        /<category name="Değişkenler"[^>]*>[\s\S]*?<\/category>/,
        `<category name="Değişkenler" colour="#9013FE">
            <block type="variables_get"></block>
            <block type="variables_set"></block>
            <block type="variables_set_typed"></block>
        </category>`
    );
}

// Metin Blokları
Blockly.Blocks['text'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldTextInput("metin"), "TEXT");
        this.setOutput(true, "String");
        this.setColour(160);
        this.setTooltip("Metin değeri");
    }
};


Blockly.Blocks['text_charAt'] = {
    init: function() {
        this.appendValueInput("VALUE")
            .setCheck("String")
            .appendField("karakter al");
        this.appendValueInput("AT")
            .setCheck("Number")
            .appendField("konum");
        this.setOutput(true, "String");
        this.setColour(160);
        this.setTooltip("Metindeki belirli konumdaki karakteri döndürür");
    }
};

Blockly.Blocks['text_getSubstring'] = {
    init: function() {
        this.appendValueInput("STRING")
            .setCheck("String")
            .appendField("alt metin");
        this.appendValueInput("START")
            .setCheck("Number")
            .appendField("başlangıç");
        this.appendValueInput("END")
            .setCheck("Number")
            .appendField("bitiş");
        this.setOutput(true, "String");
        this.setColour(160);
        this.setTooltip("Metnin bir kısmını döndürür");
    }
};

Blockly.Blocks['text_changeCase'] = {
    init: function() {
        this.appendValueInput("TEXT")
            .setCheck("String")
            .appendField("harf değiştir");
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([
                ["BÜYÜK", "UPPERCASE"],
                ["küçük", "LOWERCASE"]
            ]), "CASE");
        this.setOutput(true, "String");
        this.setColour(160);
        this.setTooltip("Metni büyük/küçük harfe çevirir");
    }
};

Blockly.Blocks['text_trim'] = {
    init: function() {
        this.appendValueInput("TEXT")
            .setCheck("String")
            .appendField("kırp");
        this.setOutput(true, "String");
        this.setColour(160);
        this.setTooltip("Metnin başındaki ve sonundaki boşlukları kaldırır");
    }
};

Blockly.Blocks['text_print'] = {
    init: function() {
        this.appendValueInput("TEXT")
            .setCheck("String")
            .appendField("yazdır");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(160);
        this.setTooltip("Metni seri porta yazdırır");
    }
};


// Metin kategorisini toolbox'a ekle
function getTextCategoryXml() {
    return `
        <category name="Metin" colour="160">
            <block type="text"></block>
        </category>
    `;
}

for (const robot in robotCardToolboxes) {
    robotCardToolboxes[robot] = robotCardToolboxes[robot].replace('<xml>', `<xml>${getTextCategoryXml()}`);
}

// VivianX için Ses Blokları
if (robotCardToolboxes['VivianX']) {
    // Ses bloğu tanımı
    Blockly.Blocks['vivianx_buzzer_play'] = {
        init: function() {
            this.appendDummyInput()
                .appendField("Buzzer ile ses çal")
                .appendField(new Blockly.FieldDropdown([
                    ["Do (C)", "262"],
                    ["Re (D)", "294"],
                    ["Mi (E)", "330"],
                    ["Fa (F)", "349"],
                    ["Sol (G)", "392"],
                    ["La (A)", "440"],
                    ["Si (B)", "494"],
                    ["Beep", "1000"]
                ]), "FREQ")
                .appendField("Hz");
            this.appendValueInput("SÜRE")
                .setCheck('Number')
                .appendField("süre (ms)");
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour('#00B3E6');
            this.setTooltip("VivianX kartında D13 pinine bağlı buzzer ile seçilen sesi çalar");
        }
    };
    Blockly.JavaScript.forBlock['vivianx_buzzer_play'] = function(block) {
        const freq = block.getFieldValue('FREQ');
        const sure = Blockly.JavaScript.valueToCode(block, 'SÜRE', Blockly.JavaScript.ORDER_NONE) || '500';
        return `tone(BUZZER, ${freq});\ndelay(${sure});\nnoTone(BUZZER);\n`;
    };
    // Ses kategorisini toolbox'a ekle
    function getVivianxSoundCategoryXml() {
        return `
            <category name="Ses" colour="#00B3E6">
                <block type="vivianx_buzzer_play"></block>
            </category>
        `;
    }
    // Önce eski "Ses" kategorisini kaldır
    robotCardToolboxes['VivianX'] = robotCardToolboxes['VivianX'].replace(/<category name="Ses"[^>]*>[\s\S]*?<\/category>/g, '');
    // Sonra tek bir Ses kategorisi ekle
    robotCardToolboxes['VivianX'] = robotCardToolboxes['VivianX'].replace('<xml>', `<xml>${getVivianxSoundCategoryXml()}`);
}

// Bloklarım kategorisini tüm robotlardan kaldır
for (const robot in robotCardToolboxes) {
    robotCardToolboxes[robot] = robotCardToolboxes[robot].replace(/<category name="Bloklarım"[^>]*>[\s\S]*?<\/category>/, '');
}

// Kategorileri istenen sıraya göre yeniden sırala
function reorderToolboxCategories(xml) {
    const order = [
        'Hareket',
        'Giriş/Çıkış',
        'Kontrol',
        'İşlemler',
        'Zaman',
        'Metin',
        'Seri Port',
        'Değişkenler'
    ];
    const categoryRegex = /<category name="([^"]+)"[\s\S]*?<\/category>/g;
    let match;
    const categories = [];
    while ((match = categoryRegex.exec(xml)) !== null) {
        categories.push({
            name: match[1],
            content: match[0],
            index: order.indexOf(match[1])
        });
    }
    // Sıralı olanlar + diğerleri (en sona)
    const sorted = [
        ...order.map(name => categories.find(c => c.name === name)).filter(Boolean),
        ...categories.filter(c => !order.includes(c.name))
    ];
    // <xml> ... </xml> arasına yerleştir
    return xml.replace(/<xml>[\s\S]*<\/xml>/, `<xml>\n${sorted.map(c => c.content).join('\n')}\n</xml>`);
}
for (const robot in robotCardToolboxes) {
    robotCardToolboxes[robot] = reorderToolboxCategories(robotCardToolboxes[robot]);
}

// Değişkenler için kod üreticileri
Blockly.JavaScript.forBlock['variables_get'] = function(block) {
    const varName = block.getFieldValue('VAR');
    const sanitizedVarName = replaceTurkishChars(varName).replace(/ /g, '_');
    return [sanitizedVarName, Blockly.JavaScript.ORDER_ATOMIC];
};
Blockly.JavaScript.forBlock['variables_set'] = function(block) {
    // Artık kod üretmiyor, tanım generateCode içinde yapılıyor.
    return '';
};
Blockly.JavaScript.forBlock['variables_set_typed'] = function(block) {
    // Artık kod üretmiyor, tanım generateCode içinde yapılıyor.
    return '';
};
// Metin için kod üreticileri
Blockly.JavaScript.forBlock['text'] = function(block) {
    const text = block.getFieldValue('TEXT');
    return [`"${text}"`, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.forBlock['text_charAt'] = function(block) {
    const value = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_NONE) || '""';
    const at = Blockly.JavaScript.valueToCode(block, 'AT', Blockly.JavaScript.ORDER_NONE) || '0';
    return [`String(${value}).charAt(${at})`, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};
Blockly.JavaScript.forBlock['text_getSubstring'] = function(block) {
    const str = Blockly.JavaScript.valueToCode(block, 'STRING', Blockly.JavaScript.ORDER_NONE) || '""';
    const start = Blockly.JavaScript.valueToCode(block, 'START', Blockly.JavaScript.ORDER_NONE) || '0';
    const end = Blockly.JavaScript.valueToCode(block, 'END', Blockly.JavaScript.ORDER_NONE) || '1';
    return [`String(${str}).substring(${start}, ${end})`, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};
Blockly.JavaScript.forBlock['text_changeCase'] = function(block) {
    const text = Blockly.JavaScript.valueToCode(block, 'TEXT', Blockly.JavaScript.ORDER_NONE) || '""';
    const kase = block.getFieldValue('CASE');
    if (kase === 'UPPERCASE') return [`String(${text}).toUpperCase()`, Blockly.JavaScript.ORDER_FUNCTION_CALL];
    else return [`String(${text}).toLowerCase()`, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};
Blockly.JavaScript.forBlock['text_trim'] = function(block) {
    const text = Blockly.JavaScript.valueToCode(block, 'TEXT', Blockly.JavaScript.ORDER_NONE) || '""';
    return [`String(${text}).trim()`, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};
Blockly.JavaScript.forBlock['text_print'] = function(block) {
    const text = Blockly.JavaScript.valueToCode(block, 'TEXT', Blockly.JavaScript.ORDER_NONE) || '""';
    return `Serial.print(${text});\n`;
};

// İşlemler için kod üreticileri
Blockly.JavaScript.forBlock['math_number'] = function(block) {
    const number = Number(block.getFieldValue('NUM'));
    return [number, Blockly.JavaScript.ORDER_ATOMIC];
};
Blockly.JavaScript.forBlock['operator_add'] = function(block) {
    const a = Blockly.JavaScript.valueToCode(block, 'A', Blockly.JavaScript.ORDER_ADDITION) || '0';
    const b = Blockly.JavaScript.valueToCode(block, 'B', Blockly.JavaScript.ORDER_ADDITION) || '0';
    return [`${a} + ${b}`, Blockly.JavaScript.ORDER_ADDITION];
};
Blockly.JavaScript.forBlock['operator_subtract'] = function(block) {
    const a = Blockly.JavaScript.valueToCode(block, 'A', Blockly.JavaScript.ORDER_SUBTRACTION) || '0';
    const b = Blockly.JavaScript.valueToCode(block, 'B', Blockly.JavaScript.ORDER_SUBTRACTION) || '0';
    return [`${a} - ${b}`, Blockly.JavaScript.ORDER_SUBTRACTION];
};
Blockly.JavaScript.forBlock['operator_multiply'] = function(block) {
    let a = '0',
        b = '0';
    const aBlock = block.getInputTargetBlock('A');
    const bBlock = block.getInputTargetBlock('B');
    if (aBlock) a = Blockly.JavaScript.valueToCode(block, 'A', Blockly.JavaScript.ORDER_MULTIPLICATION);
    if (bBlock) b = Blockly.JavaScript.valueToCode(block, 'B', Blockly.JavaScript.ORDER_MULTIPLICATION);
    return [`${a} * ${b}`, Blockly.JavaScript.ORDER_MULTIPLICATION];
};
Blockly.JavaScript.forBlock['operator_divide'] = function(block) {
    let a = '0',
        b = '1';
    const aBlock = block.getInputTargetBlock('A');
    const bBlock = block.getInputTargetBlock('B');
    if (aBlock) a = Blockly.JavaScript.valueToCode(block, 'A', Blockly.JavaScript.ORDER_DIVISION);
    if (bBlock) b = Blockly.JavaScript.valueToCode(block, 'B', Blockly.JavaScript.ORDER_DIVISION);
    return [`${a} / ${b}`, Blockly.JavaScript.ORDER_DIVISION];
};
Blockly.JavaScript.forBlock['operator_random'] = function(block) {
    let a = '0',
        b = '100';
    const aBlock = block.getInputTargetBlock('A');
    const bBlock = block.getInputTargetBlock('B');
    if (aBlock) a = Blockly.JavaScript.valueToCode(block, 'A', Blockly.JavaScript.ORDER_NONE);
    if (bBlock) b = Blockly.JavaScript.valueToCode(block, 'B', Blockly.JavaScript.ORDER_NONE);
    return [`random(${a}, ${b})`, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};
Blockly.JavaScript.forBlock['operator_gt'] = function(block) {
    let a = '0',
        b = '0';
    const aBlock = block.getInputTargetBlock('A');
    const bBlock = block.getInputTargetBlock('B');
    if (aBlock) a = Blockly.JavaScript.valueToCode(block, 'A', Blockly.JavaScript.ORDER_RELATIONAL);
    if (bBlock) b = Blockly.JavaScript.valueToCode(block, 'B', Blockly.JavaScript.ORDER_RELATIONAL);
    return [`${a} > ${b}`, Blockly.JavaScript.ORDER_RELATIONAL];
};
Blockly.JavaScript.forBlock['operator_lt'] = function(block) {
    let a = '0',
        b = '0';
    const aBlock = block.getInputTargetBlock('A');
    const bBlock = block.getInputTargetBlock('B');
    if (aBlock) a = Blockly.JavaScript.valueToCode(block, 'A', Blockly.JavaScript.ORDER_RELATIONAL);
    if (bBlock) b = Blockly.JavaScript.valueToCode(block, 'B', Blockly.JavaScript.ORDER_RELATIONAL);
    return [`${a} < ${b}`, Blockly.JavaScript.ORDER_RELATIONAL];
};
Blockly.JavaScript.forBlock['operator_equals'] = function(block) {
    let a = '0',
        b = '0';
    const aBlock = block.getInputTargetBlock('A');
    const bBlock = block.getInputTargetBlock('B');
    if (aBlock) a = Blockly.JavaScript.valueToCode(block, 'A', Blockly.JavaScript.ORDER_EQUALITY);
    if (bBlock) b = Blockly.JavaScript.valueToCode(block, 'B', Blockly.JavaScript.ORDER_EQUALITY);
    return [`${a} == ${b}`, Blockly.JavaScript.ORDER_EQUALITY];
};
Blockly.JavaScript.forBlock['operator_and'] = function(block) {
    let a = 'false',
        b = 'false';
    const aBlock = block.getInputTargetBlock('A');
    const bBlock = block.getInputTargetBlock('B');
    if (aBlock) a = Blockly.JavaScript.valueToCode(block, 'A', Blockly.JavaScript.ORDER_LOGICAL_AND);
    if (bBlock) b = Blockly.JavaScript.valueToCode(block, 'B', Blockly.JavaScript.ORDER_LOGICAL_AND);
    return [`${a} && ${b}`, Blockly.JavaScript.ORDER_LOGICAL_AND];
};
Blockly.JavaScript.forBlock['operator_or'] = function(block) {
    let a = 'false',
        b = 'false';
    const aBlock = block.getInputTargetBlock('A');
    const bBlock = block.getInputTargetBlock('B');
    if (aBlock) a = Blockly.JavaScript.valueToCode(block, 'A', Blockly.JavaScript.ORDER_LOGICAL_OR);
    if (bBlock) b = Blockly.JavaScript.valueToCode(block, 'B', Blockly.JavaScript.ORDER_LOGICAL_OR);
    return [`${a} || ${b}`, Blockly.JavaScript.ORDER_LOGICAL_OR];
};
Blockly.JavaScript.forBlock['operator_not'] = function(block) {
    let a = 'false';
    const aBlock = block.getInputTargetBlock('BOOL');
    if (aBlock) a = Blockly.JavaScript.valueToCode(block, 'BOOL', Blockly.JavaScript.ORDER_LOGICAL_NOT);
    return [`!${a}`, Blockly.JavaScript.ORDER_LOGICAL_NOT];
};
Blockly.JavaScript.forBlock['math_map'] = function(block) {
    const value = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_NONE) || '0';
    const fromLow = Blockly.JavaScript.valueToCode(block, 'FROM_LOW', Blockly.JavaScript.ORDER_NONE) || '0';
    const fromHigh = Blockly.JavaScript.valueToCode(block, 'FROM_HIGH', Blockly.JavaScript.ORDER_NONE) || '1023';
    const toLow = Blockly.JavaScript.valueToCode(block, 'TO_LOW', Blockly.JavaScript.ORDER_NONE) || '0';
    const toHigh = Blockly.JavaScript.valueToCode(block, 'TO_HIGH', Blockly.JavaScript.ORDER_NONE) || '255';
    return [`map(${value}, ${fromLow}, ${fromHigh}, ${toLow}, ${toHigh})`, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};
Blockly.JavaScript.forBlock['math_constrain'] = function(block) {
    const value = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_NONE) || '0';
    const low = Blockly.JavaScript.valueToCode(block, 'LOW', Blockly.JavaScript.ORDER_NONE) || '0';
    const high = Blockly.JavaScript.valueToCode(block, 'HIGH', Blockly.JavaScript.ORDER_NONE) || '255';
    return [`constrain(${value}, ${low}, ${high})`, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};
Blockly.JavaScript.forBlock['math_abs'] = function(block) {
    const value = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_NONE) || '0';
    return [`abs(${value})`, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};
Blockly.JavaScript.forBlock['math_min'] = function(block) {
    const a = Blockly.JavaScript.valueToCode(block, 'A', Blockly.JavaScript.ORDER_NONE) || '0';
    const b = Blockly.JavaScript.valueToCode(block, 'B', Blockly.JavaScript.ORDER_NONE) || '0';
    return [`min(${a}, ${b})`, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};
Blockly.JavaScript.forBlock['math_max'] = function(block) {
    const a = Blockly.JavaScript.valueToCode(block, 'A', Blockly.JavaScript.ORDER_NONE) || '0';
    const b = Blockly.JavaScript.valueToCode(block, 'B', Blockly.JavaScript.ORDER_NONE) || '0';
    return [`max(${a}, ${b})`, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

// Kontrol için kod üreticileri
Blockly.JavaScript.forBlock['controls_if'] = function(block) {
    let condition = 'false';
    const condBlock = block.getInputTargetBlock('IF0');
    if (condBlock) condition = Blockly.JavaScript.valueToCode(block, 'IF0', Blockly.JavaScript.ORDER_NONE);
    const statements = Blockly.JavaScript.statementToCode(block, 'DO0');
    return `if (${condition}) {\n${statements}}\n`;
};
Blockly.JavaScript.forBlock['controls_if_else'] = function(block) {
    let condition = 'false';
    const condBlock = block.getInputTargetBlock('IF0');
    if (condBlock) condition = Blockly.JavaScript.valueToCode(block, 'IF0', Blockly.JavaScript.ORDER_NONE);
    const doIf = Blockly.JavaScript.statementToCode(block, 'DO0');
    const doElse = Blockly.JavaScript.statementToCode(block, 'ELSE');
    return `if (${condition}) {\n${doIf}} else {\n${doElse}}\n`;
};
Blockly.JavaScript.forBlock['controls_repeat_ext'] = function(block) {
    const times = Blockly.JavaScript.valueToCode(block, 'TIMES', Blockly.JavaScript.ORDER_NONE) || '0';
    const statements = Blockly.JavaScript.statementToCode(block, 'DO');
    return `for (int i = 0; i < ${times}; i++) {\n${statements}}\n`;
};
Blockly.JavaScript.forBlock['controls_for'] = function(block) {
    const varName = block.getFieldValue('VAR') || 'i';
    const from = Blockly.JavaScript.valueToCode(block, 'FROM', Blockly.JavaScript.ORDER_NONE) || '0';
    const to = Blockly.JavaScript.valueToCode(block, 'TO', Blockly.JavaScript.ORDER_NONE) || '0';
    const by = Blockly.JavaScript.valueToCode(block, 'BY', Blockly.JavaScript.ORDER_NONE) || '1';
    const statements = Blockly.JavaScript.statementToCode(block, 'DO');
    return `for (int ${varName} = ${from}; ${varName} <= ${to}; ${varName} += ${by}) {\n${statements}}\n`;
};
Blockly.JavaScript.forBlock['controls_forever'] = function(block) {
    const statements = Blockly.JavaScript.statementToCode(block, 'DO');
    return `while (true) {\n${statements}}\n`;
};
Blockly.JavaScript.forBlock['controls_repeat_until'] = function(block) {
    const condition = Blockly.JavaScript.valueToCode(block, 'BOOL', Blockly.JavaScript.ORDER_NONE) || 'false';
    const statements = Blockly.JavaScript.statementToCode(block, 'DO');
    return `while (!(${condition})) {\n${statements}}\n`;
};
Blockly.JavaScript.forBlock['controls_flow_statements'] = function(block) {
    const flow = block.getFieldValue('FLOW');
    if (flow === 'BREAK') return 'break;\n';
    if (flow === 'CONTINUE') return 'continue;\n';
    return '';
};

// PinMode Bloğu (sadece boş pinler için)
function getEmptyPinsForDropdown() {
    const robotType = selectedRobot || 'MazeX';
    const pinMappings = robotCardPinMappings[robotType];
    let emptyPins = [];
    if (robotType === 'MazeX' || robotType === 'LineX') {
        // Sensör ve dijitalde 'Boş' olanlar
        emptyPins = [
            ...Object.entries(pinMappings.sensors || {}).filter(([name]) => name === 'Boş'),
            ...Object.entries(pinMappings.digital || {}).filter(([name]) => name === 'Boş')
        ];
        // LineX için D0 ve D1 pinleri her zaman ekli değilse manuel ekle
        if (robotType === 'LineX') {
            const pinNames = emptyPins.map(([_, pin]) => pin);
            if (!pinNames.includes('D0')) emptyPins.push(['D0', 'D0']);
            if (!pinNames.includes('D1')) emptyPins.push(['D1', 'D1']);
        }
        // MazeX için A6'yı manuel ekle
        if (robotType === 'MazeX') {
            const pinNames = emptyPins.map(([_, pin]) => pin);
            if (!pinNames.includes('A6')) emptyPins.push(['A6', 'A6']);
        }
    } else if (robotType === 'VivianX') {
        emptyPins = [
            ...Object.entries(pinMappings.analogIO || {}),
            ...Object.entries(pinMappings.digitalIO || {}), ['D0', 'D0'],
            ['D1', 'D1']
        ];
    }
    return emptyPins.map(([name, pin]) => [pin, pin]);
}

Blockly.Blocks['set_pin_mode'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Pin Modunu Ayarla")
            .appendField(new Blockly.FieldDropdown(getEmptyPinsForDropdown), "PIN")
            .appendField(new Blockly.FieldDropdown([
                ["Giriş (INPUT)", "INPUT"],
                ["Çıkış (OUTPUT)", "OUTPUT"]
            ]), "MODE");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#50E3C2');
        this.setTooltip("Sadece boş pinler için giriş/çıkış modunu ayarlar.");
    }
};

Blockly.JavaScript.forBlock['set_pin_mode'] = function(block) {
    const pin = block.getFieldValue('PIN');
    const mode = block.getFieldValue('MODE');
    return `pinMode(${pin}, ${mode});\n`;
};

// Giriş/Çıkış kategorisine ekle
for (const robot in robotCardToolboxes) {
    robotCardToolboxes[robot] = robotCardToolboxes[robot].replace(
        /(<category name="Giriş\/Çıkış"[^>]*>)/,
        `$1\n<block type="set_pin_mode"></block>`
    );
}

Blockly.Blocks['fan_control'] = {
    init: function() {
        this.appendDummyInput()
            .appendField('Fan Kontrol')
            .appendField(new Blockly.FieldDropdown([
                ['Açık', 'HIGH'],
                ['Kapalı', 'LOW']
            ]), 'STATE');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#50E3C2');
        this.setTooltip('Robotun fanını kontrol eder');
    }
};

Blockly.JavaScript.forBlock['fan_control'] = function(block) {
    const robotType = selectedRobot;
    let pin = null;
    if (robotType && robotCardPinMappings[robotType] && robotCardPinMappings[robotType].digital && robotCardPinMappings[robotType].digital['Fan Çıkışı']) {
        pin = robotCardPinMappings[robotType].digital['Fan Çıkışı'];
    }
    if (!pin) {
        console.warn('Fan çıkışı pini bulunamadı!');
        return '';
    }
    const state = block.getFieldValue('STATE');
    return `digitalWrite(${fixPinNames(pin)}, ${state});\n`;
};

// --- YENİ EKLEME: Sadece setup'ta olması gereken komutlar ---
const setupOnlyCommands = [
    /^Serial\.begin\(/,
    /^Wire\.begin\(/,
    /^display\.begin\(/,
    /^display\.clearDisplay\(/,
    /^display\.setTextSize\(/,
    /^display\.setTextColor\(/,
    /^display\.setCursor\(/,
    /^display\.display\(/,
    // Gerekirse eklenebilir
];
// ... mevcut kod ...

// Metin ve değişkenler kategorisi güncellemesi
for (const robot in robotCardToolboxes) {
    // Metin kategorisini güncelle
    robotCardToolboxes[robot] = robotCardToolboxes[robot].replace(
        /<category name="Metin"[^>]*>[\s\S]*?<\/category>/,
        `<category name="Metin" colour="160">
            <block type="text"></block>
        </category>`
    );
    // Değişkenler kategorisini güncelle
    robotCardToolboxes[robot] = robotCardToolboxes[robot].replace(
        /<category name="Değişkenler"[^>]*>[\s\S]*?<\/category>/,
        `<category name="Değişkenler" colour="#9013FE">
            <block type="variables_get"></block>
            <block type="variables_set"></block>
            <block type="variables_set_typed"></block>
        </category>`
    );
}
// ... mevcut kod ...

// 1. Yeni değişken oluşturma bloğu
Blockly.Blocks['variable_create'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Yeni Değişken Oluştur")
            .appendField(new Blockly.FieldTextInput("degisken", function(name) {
                // Türkçe karakterleri temizle
                return replaceTurkishChars(name).replace(/ /g, '_');
            }), "VARNAME");
        this.setPreviousStatement(false, null);
        this.setNextStatement(false, null);
        this.setColour('#9013FE');
        this.setTooltip("Yeni bir değişken oluşturur (int, 0 değerli)");
    }
};

// 2. Mevcut değişkenleri açılır pencerede gösteren bloklar
function getAllVariableOptions() {
    if (!workspace) return [
        ["degisken", "degisken"]
    ];
    // variable_create ve variable_set_typed ile oluşturulan değişkenleri de topla
    const allBlocks = workspace.getAllBlocks(false);
    const manualVars = [];
    allBlocks.forEach(block => {
        if (block.type === 'variable_create') {
            const varName = replaceTurkishChars(block.getFieldValue('VARNAME')).replace(/ /g, '_');
            if (varName && !manualVars.includes(varName)) manualVars.push(varName);
        }
        if (block.type === 'variable_set_typed') {
            // VARNAME input'una bağlı bloğun field'ını oku
            let varName = null;
            const varNameBlock = block.getInputTargetBlock('VARNAME');
            if (varNameBlock && varNameBlock.type === 'text') {
                varName = replaceTurkishChars(varNameBlock.getFieldValue('TEXT')).replace(/ /g, '_');
            }
            if (varName && !manualVars.includes(varName)) manualVars.push(varName);
        }
    });
    const vars = workspace.getAllVariables().map(v => replaceTurkishChars(v.name).replace(/ /g, '_'));
    const allVarNames = Array.from(new Set([...vars, ...manualVars]));
    return allVarNames.length ? allVarNames.map(v => [v, v]) : [
        ["degisken", "degisken"]
    ];
}

Blockly.Blocks['variable_get'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown(getAllVariableOptions), "VAR");
        this.setOutput(true, null);
        this.setColour('#9013FE');
        this.setTooltip("Seçilen değişkenin değerini döndürür");
    }
};

Blockly.Blocks['variable_set'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Ata")
            .appendField(new Blockly.FieldDropdown(getAllVariableOptions), "VAR");
        this.appendValueInput("VALUE")
            .setCheck(null)
            .appendField("değeri");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#9013FE');
        this.setTooltip("Seçilen değişkene değer atar");
    }
};

// 4. Tipli ata bloğu güncellemesi
Blockly.Blocks['variable_set_typed'] = {
    init: function() {
        this.appendValueInput("VARNAME")
            .setCheck("String")
            .appendField("Ata değişken ismi");
        this.appendValueInput("VALUE")
            .appendField("değeri");
        this.appendDummyInput()
            .appendField("olarak")
            .appendField(new Blockly.FieldDropdown([
                ["Karakter", "char"],
                ["Sayı", "number"],
                ["Metin", "string"],
                ["Zaman", "unsigned_long"],
                ["Mantıksal", "bool"]
            ]), "TYPE");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#9013FE');
        this.setTooltip("Değişkene tip seçerek değer atar");
    }
};

// 3. Eski değişken bloklarını kaldır
// (Kategorideki eski değişken bloklarını kaldırmak için toolbox güncellemesi yapılacak)
for (const robot in robotCardToolboxes) {
    robotCardToolboxes[robot] = robotCardToolboxes[robot].replace(
        /<category name="Değişkenler"[^>]*>[\s\S]*?<\/category>/,
        `<category name="Değişkenler" colour="#9013FE">
            <block type="variable_create"></block>
            <block type="variable_get"></block>
            <block type="variable_set"></block>
            <block type="variable_set_typed"></block>
        </category>`
    );
}

// Kod üreticileri
Blockly.JavaScript.forBlock['variable_create'] = function(block) {
    const varName = replaceTurkishChars(block.getFieldValue('VARNAME')).replace(/ /g, '_');
    // Sadece tanım, değer atama yok
    return `int ${varName} = 0;\n`;
};
Blockly.JavaScript.forBlock['variable_get'] = function(block) {
    const varName = block.getFieldValue('VAR');
    return [varName, Blockly.JavaScript.ORDER_ATOMIC];
};
Blockly.JavaScript.forBlock['variable_set'] = function(block) {
    const varName = block.getFieldValue('VAR');
    const value = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_NONE) || '0';
    return `${varName} = ${value};\n`;
};
Blockly.JavaScript.forBlock['variable_set_typed'] = function(block) {
    // Artık kod üretmiyor, tanım generateCode içinde yapılıyor.
    return '';
};
// ... mevcut kod ...

document.addEventListener('DOMContentLoaded', function() {
    const minimizeBtn = document.getElementById('minimizeBtn');
    const maximizeBtn = document.getElementById('maximizeBtn');
    const closeBtn = document.getElementById('closeBtn');
    if (minimizeBtn) minimizeBtn.addEventListener('click', () => window.ipcRenderer.send ? window.ipcRenderer.send('window-minimize') : null);
    if (maximizeBtn) maximizeBtn.addEventListener('click', () => window.ipcRenderer.send ? window.ipcRenderer.send('window-maximize') : null);
    if (closeBtn) closeBtn.addEventListener('click', () => window.ipcRenderer.send ? window.ipcRenderer.send('window-close') : null);
});

// VivianX için Giriş/Çıkış kategorisine Analog Oku bloğunu ekle
robotCardToolboxes['VivianX'] = robotCardToolboxes['VivianX'].replace(
    /(<category name="Giriş\/Çıkış"[^>]*>)/,
    `$1\n<block type="read_analog_pin"></block>`
);

// LineX için Giriş/Çıkış kategorisine Analog Oku bloğunu ekle
robotCardToolboxes['LineX'] = robotCardToolboxes['LineX'].replace(
    /(<category name="Giriş\/Çıkış"[^>]*>)/,
    `$1\n<block type="read_analog_pin"></block>`
);

// MazeX için Giriş/Çıkış kategorisine Analog Oku bloğunu ekle
robotCardToolboxes['MazeX'] = robotCardToolboxes['MazeX'].replace(
    /(<category name="Giriş\/Çıkış"[^>]*>)/,
    `$1\n<block type="read_analog_pin"></block>`
);

// Yeni delay_miliseconds bloğu
Blockly.Blocks['delay_miliseconds'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Bekle");
        this.appendValueInput("SÜRE")
            .setCheck('Number')
            .appendField("ms");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#FF6680'); // Zaman
        this.setTooltip("Belirtilen süre kadar bekler (milisaniye)");
    }
};

Blockly.JavaScript.forBlock['delay_miliseconds'] = function(block) {
    const sure = Blockly.JavaScript.valueToCode(block, 'SÜRE', Blockly.JavaScript.ORDER_NONE) || '0';
    return `delay(${sure});\n`;
};

// Tüm toolbox'larda robot_bekle yerine delay_miliseconds kullan
for (const robot in robotCardToolboxes) {
    robotCardToolboxes[robot] = robotCardToolboxes[robot].replace(
        /<block type="robot_bekle"><\/block>/g,
        '<block type="delay_miliseconds"></block>'
    );
}
// ... mevcut kod ...

// Doğru/Yanlış (Boolean) Bloğu
Blockly.Blocks['logic_boolean_tr'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([
                ["doğru", "TRUE"],
                ["yanlış", "FALSE"]
            ]), "BOOL");
        this.setOutput(true, "Boolean");
        this.setColour('#7ED321'); // İşlemler
        this.setTooltip("Doğru (true) veya yanlış (false) değeri döndürür");
    }
};

Blockly.JavaScript.forBlock['logic_boolean_tr'] = function(block) {
    const value = block.getFieldValue('BOOL') === 'TRUE' ? 'true' : 'false';
    return [value, Blockly.JavaScript.ORDER_ATOMIC];
};

// Tüm toolbox'larda İşlemler kategorisine ekle
for (const robot in robotCardToolboxes) {
    robotCardToolboxes[robot] = robotCardToolboxes[robot].replace(
        /(<category name="İşlemler"[^>]*>)/,
        `$1\n<block type="logic_boolean_tr"></block>`
    );
}
// ... existing code ...

// VivianX için çevre birimleri bloklarını araç kutusundan kaldır
robotCardToolboxes['VivianX'] = robotCardToolboxes['VivianX']
    .replace(/<block type="bluetooth_send_data"><\/block>/g, '')
    .replace(/<block type="oled_print_text"><\/block>/g, '')
    .replace(/<block type="nrf24_init"><\/block>/g, '')
    .replace(/<block type="nrf24_set_channel"><\/block>/g, '')
    .replace(/<block type="nrf24_set_power"><\/block>/g, '')
    .replace(/<block type="nrf24_send_data"><\/block>/g, '')
    .replace(/<block type="esp01_test"><\/block>/g, '')
    .replace(/<block type="esp01_set_mode"><\/block>/g, '')
    .replace(/<block type="esp01_wifi_setup"><\/block>/g, '')
    .replace(/<block type="esp01_tcp_setup"><\/block>/g, '')
    .replace(/<block type="esp01_check_connection"><\/block>/g, '')
    .replace(/<block type="esp01_send_data"><\/block>/g, '')
    // Çevre Birimleri kategorisini tamamen kaldır
    .replace(/<category name="Çevre Birimleri"[\s\S]*?<\/category>/g, '');
// ... mevcut kod ...

for (const robot in robotCardToolboxes) {
    robotCardToolboxes[robot] = robotCardToolboxes[robot].replace(
        /(<category name="Seri Port"[^>]*>)/,
        `$1\n<block type="serial_read"></block>`
    );
}
// ... existing code ...

for (const robot in robotCardToolboxes) {
    robotCardToolboxes[robot] = robotCardToolboxes[robot].replace(
        /(<category name="Seri Port"[^>]*>)/,
        `$1\n<block type="serial_available"></block>`
    );
}
// ... existing code ...