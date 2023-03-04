#include <LiquidCrystal.h>
#include <Keypad.h>

// Pines para los relés
const int PIN_BOMBA = 2;
const int PIN_VENTILACION = 3;
const int PIN_DRENAJE = 4;

// Pines para los sensores de temperatura
const int PIN_SENSOR_INT = A0;
const int PIN_SENSOR_EXT = A1;

// Constantes para el teclado matricial
const byte FILAS = 4;
const byte COLUMNAS = 4;
char teclas[FILAS][COLUMNAS] = {
  {'1', '2', '3', 'A'},
  {'4', '5', '6', 'B'},
  {'7', '8', '9', 'C'},
  {'*', '0', '#', 'D'}
};
byte pinesFilas[FILAS] = {9, 8, 7, 6};
byte pinesColumnas[COLUMNAS] = {5, 4, 3, 2};
Keypad teclado = Keypad(makeKeymap(teclas), pinesFilas, pinesColumnas, FILAS, COLUMNAS);

// Variables para el control de tiempos
unsigned long tiempoInicioEmbebido = 0;
unsigned long tiempoInicioDrenaje = 0;
const unsigned long TIEMPO_EMBEBIDO = 180000; // 3 minutos en milisegundos
const unsigned long TIEMPO_DRENAJE = 20000; // 20 segundos en milisegundos
const unsigned long TIEMPO_DRENAJE_AUTO = 259200000; // 72 horas en milisegundos
String nuevoTiempoDrenajeAuto = ""; // Variable auxiliar para almacenar los dígitos ingresados durante la edición del tiempo de drenado automático

// Variables para el control de los relés
bool bombaEncendida = false;
bool ventilacionEncendida = false;

// Variables para el control de la pantalla LCD
LiquidCrystal lcd(12, 11, 5, 4, 3, 2);
float tempInt = 0.0;
float tempExt = 0.0;

void setup() {
  // Configuración de pines
  pinMode(PIN_BOMBA, OUTPUT);
  pinMode(PIN_VENTILACION, OUTPUT);
  pinMode(PIN_DRENAJE, OUTPUT);

  // Inicialización de la pantalla LCD
  lcd.begin(16, 2);
  lcd.print("Temperatura Int.:");
  lcd.setCursor(0, 1);
  lcd.print("Temperatura Ext.:");

  // Mostrar temperatura inicial
  tempInt = leerTemperatura(PIN_SENSOR_INT);
  tempExt = leerTemperatura(PIN_SENSOR_EXT);
  mostrarTemperaturas();

  // Encender bomba si hay suficiente agua
  if (hayAgua()) {
    digitalWrite(PIN_BOMBA, HIGH);
    bombaEncendida = true;
  }
}

void loop() {
  // Leer temperatura interior y exterior
  tempInt = leerTemperatura(PIN_SENSOR_INT);
  tempExt = leerTemperatura(PIN_SENSOR_EXT);
  mostrarTemperaturas();

  // Verificar si se ha embebido suficiente tiempo
  if (millis() - tiempoInicioEmbebido >= TIEMPO_EMBEBIDO && ventilacionEncendida == false) {
    digitalWrite(PIN_VENTILACION, HIGH);
    ventilacionEncendida = true;
  }

  // Verificar si se debe ejecutar el drenaje automático
if (millis() - tiempoInicioDrenaje >= TIEMPO_DRENAJE_AUTO) {
drenarAgua();
tiempoInicioDrenaje = millis();
}

// Verificar si se ha presionado una tecla del teclado matricial
char tecla = teclado.getKey();
if (tecla != NO_KEY) {
// Si se presionó la tecla B, encender o apagar la bomba
if (tecla == 'B') {
if (bombaEncendida) {
digitalWrite(PIN_BOMBA, LOW);
bombaEncendida = false;
} else {
if (hayAgua()) {
digitalWrite(PIN_BOMBA, HIGH);
bombaEncendida = true;
}
}
}


// Si se presionó la tecla A, ingresar a modo de edición del tiempo de drenado automático
if (tecla == 'A') { // Modo edición de tiempo de drenaje automático
    lcd.setCursor(0, 0);
    lcd.print("Editar tiempo auto");
    lcd.setCursor(0, 1);
    lcd.print("Drenaje (horas):   ");
    
    while (teclado.getKey() == 'A') {
      delay(10);
    }
    
    nuevoTiempoDrenajeAuto = 0;
    while (nuevoTiempoDrenajeAuto < 999) { // Máximo de 999 horas
      tecla = teclado.getKey();
      if (tecla != NO_KEY) {
        if (tecla >= '0' && tecla <= '9') {
          nuevoTiempoDrenajeAuto = nuevoTiempoDrenajeAuto * 10 + (tecla - '0');
          lcd.setCursor(16, 1);
          lcd.print(nuevoTiempoDrenajeAuto);
        } else if (tecla == '*' || tecla == '#') {
          if (tecla == '*') {
            // Convertir horas a milisegundos
            tiempoDrenajeAuto = nuevoTiempoDrenajeAuto * 3600000;
            lcd.setCursor(0, 0);
            lcd.print("Tiempo auto drenaj:");
            // Mostrar el tiempo en horas en lugar de milisegundos
            lcd.setCursor(0, 1);
            lcd.print(tiempoDrenajeAuto / 3600000);
          } else {
            lcd.setCursor(0, 0);
            lcd.print("Tiempo auto drenaj:");
            // Mostrar el tiempo en horas en lugar de milisegundos
            lcd.setCursor(0, 1);
            lcd.print(tiempoDrenajeAuto / 3600000);
          }
          
          while (teclado.getKey() == '*' || teclado.getKey() == '#') {
            delay(10);
          }
          return;
        }
      }
      delay(10);
    }
  }
  

// Si se presionó la tecla C, encender o apagar la ventilación
else if (tecla == 'C') {
if (ventilacionEncendida) {
digitalWrite(PIN_VENTILACION, LOW);
ventilacionEncendida = false;
} else {
if (millis() - tiempoInicioEmbebido >= TIEMPO_EMBEBIDO) {
digitalWrite(PIN_VENTILACION, HIGH);
ventilacionEncendida = true;
}
}
}
// Si se presionó la tecla D, ejecutar el drenaje manual
else if (tecla == 'D') {
drenarAgua();
}
// Si se presionó cualquier otra tecla, mostrar un mensaje de error en la pantalla
else {
lcd.setCursor(0, 0);
lcd.print("Tecla no valida ");
}
}
}

// Función para leer la temperatura de un sensor LM35 conectado a un pin analógico
float leerTemperatura(int pin) {
int lectura = analogRead(pin);
float voltaje = (lectura / 1023.0) * 5.0;
float temperatura = (voltaje - 0.5) * 100.0;
return temperatura;
}

// Función para mostrar las temperaturas en la pantalla LCD
void mostrarTemperaturas() {
lcd.setCursor(18, 0);
lcd.print(tempInt, 1);
lcd.setCursor(18, 1);
lcd.print(tempExt, 1);
}

// Función para verificar si hay suficiente agua para encender la bomba
bool hayAgua() {
// Código para verificar la cantidad de agua en un depósito o tanque
// En este ejemplo, se asume que siempre hay suficiente agua
return true;
}

// Función para drenar el agua sucia del sistema
void drenarAgua() {
digitalWrite(PIN_DRENAJE, HIGH);
delay(TIEMPO_DRENAJE);
digitalWrite(PIN_DRENAJE, LOW);
tiempoInicioDrenaje = millis();
}
