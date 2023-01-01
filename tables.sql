-- Active: 1663296944663@@35.226.146.116@3306@hooks-4313245-diogo-bomfim
CREATE TABLE IF NOT EXISTS Wirecard_clients (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    cpf VARCHAR(11) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS Wirecard_payments (
    payment_id VARCHAR(255) PRIMARY KEY,
    client_id VARCHAR(255) NOT NULL,
    method ENUM("CARD", "BOLETO") NOT NULL,
    amount DECIMAL (8,2) NOT NULL,
    card_holder_name VARCHAR(255),
    card_number VARCHAR(16),
    card_exp_date VARCHAR(10),
    card_cvv VARCHAR(3),
    status ENUM("APROVADO", "ESPERA", "NEGADO") NOT NULL,
    FOREIGN KEY (client_id) REFERENCES Wirecard_clients(id)
);

