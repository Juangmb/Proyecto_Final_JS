CREATE TABLE "transacciones" (
	"transaction_id"	INTEGER NOT NULL UNIQUE,
	"fecha"	TEXT NOT NULL,
	"hora"	TEXT NOT NULL,
	"from_moneda"	TEXT NOT NULL,
	"from_cantidad"	REAL NOT NULL,
	"to_moneda"	TEXT NOT NULL,
	"to_cantidad"	REAL NOT NULL,
	PRIMARY KEY("transaction_id" AUTOINCREMENT)
)