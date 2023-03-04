/*- Salidas y variables: Bomba, ventilaion y drenaje 
- Una pantalla con informacion de temperatura interior y exterior de la maquina, programable 
- Cuando se ponga en marcha el sistema temporizar el arranque 
- la bomba arrancar de forma inmedita si tiene agua suficiente
- luego de embeber los paneles por 3` arranca el sistema de ventilacion
- automaticamente el sistema cada X horas (12, 24 ó 72) ejecutar un drenaje del agua 
- posibilidad de dejar la ventilacion en continuo

- Extra interesante, usar el Arduino como detector de sobrecorriente con un toroide, 
 con el fin de proteger la bomba y el ventilador (ahorro en guardamotores)*/


 /*Proyecto MEC, Nicolas Carli*/


// Librerias


 // Variables
int sensorInterior = A0;
int sensorExterior = A1;
int bomba = 3; // Pin digital para el relé de la bomba
int ventilacion = 4; // Pin digital para el relé de la Ventilacion
int drenaje = 5; // Pin digital para el relé del drenaje

int tempInterior = 0; // Variable para almacenar la temperatura interior
int tempExterior = 0; // Variable para almacenar la temperatura interior

unsigned long tiempoInicio = 0;
unsigned long tiempoUltimoDrenaje = 0;
unsigned long tiempoDrenaje = 0;
bool drenajeEjecutado = false;

// Configuración
void setup() {
  pinMode(sensorInterior, INPUT);
  pinMode(sensorExterior, INPUT);
  pinMode(bomba, OUTPUT);
  pinMode(ventilacion, OUTPUT);
  pinMode(drenaje, OUTPUT);
  
  // Configuración de la pantalla y temporizador
  // ...

  // Inicio del tiempo
  tiempoInicio = millis();
}

// Loop
void loop() {
  // Lectura de los sensores de temperatura
  tempInterior = analogRead(sensorInterior);
  tempExterior = analogRead(sensorExterior);

  // Actualización de la pantalla con la información de temperatura
  // ...

  // Temporizador de arranque
  if (millis() - tiempoInicio < TIEMPO_ARRANQUE) {
    return;
  }

  // Arranque de la bomba
  if (tieneAguaSuficiente()) {
    digitalWrite(bomba, HIGH);
  } else {
    digitalWrite(bomba, LOW);
  }

  // Arranque de la ventilación
  if (millis() - tiempoInicio >= TIEMPO_VENTILACION && millis() - tiempoInicio < TIEMPO_DRENAJE && !drenajeEjecutado) {
    digitalWrite(ventilacion, HIGH);
  } else {
    digitalWrite(ventilacion, LOW);
  }

  // Ejecución del drenaje
  if (millis() - tiempoUltimoDrenaje >= tiempoDrenaje) {
    digitalWrite(drenaje, HIGH);
    delay(1000); // Esperar un segundo para asegurarse de que el agua se ha drenado completamente
    digitalWrite(drenaje, LOW);
    tiempoUltimoDrenaje = millis();
    drenajeEjecutado = true;
  }

  // Reinicio del tiempo para la ejecución del drenaje
  if (millis() - tiempoInicio >= TIEMPO_DRENAJE) {
    tiempoInicio = millis();
    drenajeEjecutado = false;
    tiempoDrenaje = obtenerTiempoDrenaje();
  }
}

// Función para verificar si hay suficiente agua
bool tieneAguaSuficiente() {
  // Lógica para verificar si hay suficiente agua
}

// Función para obtener el tiempo de drenaje
unsigned long obtenerTiempoDrenaje() {
  // Lógica para obtener el tiempo de drenaje basado en la configuración
}
