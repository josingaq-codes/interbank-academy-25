# 📌 Procesamiento de Transacciones Bancarias (CLI)

## 📖 Introducción

Este proyecto es una aplicación de línea de comandos (CLI) en Node.js que procesa un archivo CSV con transacciones bancarias y genera un reporte con:

- **Balance Final**:
Suma de los montos de las transacciones de tipo "Crédito" menos la suma de los montos de las transacciones de tipo "Débito".
- **Transacción de Mayor Monto**:
Identificar el ID y el monto de la transacción con el valor más alto.
- **Conteo de Transacciones**:
Número total de transacciones para cada tipo ("Crédito" y "Débito").

## 🚀 Instrucciones de Ejecución

### Clonar el Repositorio

Clona el repositorio base desde GitHub:

```sh
git clone https://github.com/josingaq-codes/interbank-academy-25.git
```

### Instalación de Dependencias

Si aún no tienes Node.js instalado, descárgalo desde [aquí](https://nodejs.org/).  
Luego, instala las dependencias necesarias ejecutando:

```sh
cd interbank-academy-25

npm install
```

### Ejecución del Programa

Para ejecutar la aplicación, usa el siguiente comando en la terminal:

```sh
npm run start
```

El reporte de transacciones se mostrará en la terminal y se guardará en `reporte.txt`.

## 🏗️ Enfoque y Solución

El programa sigue estos pasos:

1. **Leer el archivo CSV** con `fs.createReadStream()`.
2. **Parsear los datos** usando `csv-parser`.
3. **Procesar la información** para calcular:
   - Balance final.
   - Transacción con mayor monto.
   - Cantidad de transacciones por tipo.
4. **Manejo de Errores**:
   - Verifica que el archivo CSV exista.
   - Ignora líneas con datos incorrectos.
   - Captura errores en la lectura del archivo.

## 📂 Estructura del Proyecto

```
📂 interbank-academy-25/
 ├── 📂 src/
 │   ├── 📄 index.js        # Lógica principal
 ├── 📄 package.json        # Dependencias del proyecto
 ├── 📄 README.md           # Documentación
 ├── 📄 data.csv            # Archivo de datos
 ├── 📄 reporte.txt         # Reporte generado
```

## 📊 Formato del Archivo CSV
El archivo `data.csv` debe tener el siguiente formato:

```csv
id,tipo,monto
1,Crédito,100.00
2,Débito,50.00
3,Crédito,200.00
4,Débito,75.00
5,Crédito,150.00
```

### ✅ Ejemplo de Salida
```plaintext
📊 Reporte de Transacciones
------------------------------------------------------
💰 Balance Final: 325.00
📈 Transacción de Mayor Monto: ID 3 - Monto 200.00
📌 Conteo de Transacciones: Crédito: 3 - Débito: 2
```

### 📸 Resultado esperado
![Ejemplo de Salida](/image.png)

## 📌 Notas Adicionales

- Asegúrate de que el archivo `data.csv` esté en la raíz del proyecto.
- Si el archivo tiene errores, el programa los reportará sin detenerse abruptamente.

📩 **Autor**: José Leonel Inga Quintana
