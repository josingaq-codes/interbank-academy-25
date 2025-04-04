import path from "path";
import { createReadStream, existsSync, writeFileSync } from "fs";
import csv from "csv-parser";

function procesarData() {
  const fileDataPath = path.join(process.cwd(), "data.csv");
  const fileReportPath = path.join(process.cwd(), "reporte.txt");

  if (!existsSync(fileDataPath)) {
    console.error("❌ Error: El archivo no existe");
    process.exit(1);
  }

  const fileExtension = path.extname(fileDataPath);
  if (fileExtension !== ".csv") {
    console.error("❌ Error: El archivo no es un CSV");
    process.exit(1);
  }

  const fileName = path.basename(fileDataPath);
  if (fileName !== "data.csv") {
    console.error(
      "❌ Error: El archivo no tiene el nombre correcto. El nombre debe de ser: 'data.csv'"
    );
    process.exit(1);
  }

  console.log("✅ Ruta del archivo:", fileDataPath, "\n");

  let balance = 0;
  let maxTransaction = { id: null, monto: 0 };
  let conteo = { credito: 0, debito: 0 };

  console.log("📊 Procesando el archivo CSV...", "\n");

  createReadStream(fileDataPath)
    .pipe(csv())
    .on("data", (row) => {
      try {
        const id = row.id;
        const tipo = row.tipo.trim();
        const monto = parseFloat(row.monto);

        if (isNaN(monto)) {
          console.warn(
            `⚠️  Advertencia: Monto inválido en la transacción ID ${id}. Se omitirá.`,
            "\n"
          );
          return;
        }

        if (tipo === "Crédito") {
          balance += monto;
          conteo.credito++;
        } else if (tipo === "Débito") {
          balance -= monto;
          conteo.debito++;
        } else {
          console.warn(
            `⚠️  Advertencia: Tipo de transacción desconocido en ID ${id}. Se omitirá.`,
            "\n"
          );
          return;
        }

        if (monto > maxTransaction.monto) {
          maxTransaction = { id, monto };
        }
      } catch (error) {
        console.error(`❌ Error procesando una fila: ${error.message}`);
      }
    })
    .on("end", () => {
      console.log("✅ Proceso completado!!!", "\n");

      const reporte =
        `📊 Reporte de Transacciones` +
        `\n` +
        `------------------------------------------------------` +
        `\n` +
        `💰 Balance Final: ${balance.toFixed(2)}` +
        `\n` +
        `📈 Transacción de Mayor Monto: ID ${
          maxTransaction.id
        } - Monto ${maxTransaction.monto.toFixed(2)}` +
        `\n` +
        `📌 Conteo de Transacciones: Crédito: ${conteo.credito} - Débito: ${conteo.debito}`;

      console.log(reporte, "\n");

      try {
        writeFileSync(fileReportPath, reporte.trim());
        console.log(`📄 Reporte guardado en la ruta: ${fileReportPath}`, "\n");
      } catch (error) {
        console.error(`❌ Error guardando el reporte: ${error.message}`, "\n");
      }
    })
    .on("error", (error) => {
      console.error(`❌ Error al leer el archivo CSV: ${error.message}`, "\n");
    });
}

procesarData();
