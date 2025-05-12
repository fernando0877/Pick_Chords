import sqlite3
import os

# 👇 1 = extrair só 10 músicas | 0 = extrair todas
modo_teste = 0

# Caminho relativo do banco de dados
caminho_banco = os.path.join(os.path.dirname(__file__), "OnSong", "OnSong.sqlite3")


# Verificar se o arquivo existe
if not os.path.isfile(caminho_banco):
    print("❌ Arquivo OnSong.sqlite3 não encontrado na pasta do programa.")
    exit(1)

# Pasta de saída baseada no modo
pasta_saida = "musicas_teste" if modo_teste == 1 else "musicas_extraidas"
os.makedirs(pasta_saida, exist_ok=True)

# Conectar ao banco
conn = sqlite3.connect(caminho_banco)
cursor = conn.cursor()

# Seleção de músicas
sql = "SELECT title, byline, content, capo, transpose FROM Song"
if modo_teste == 1:
    sql += " LIMIT 10"

cursor.execute(sql)
rows = cursor.fetchall()

# Limpeza de nomes de arquivos
def limpar_nome(nome):
    return "".join(c if c.isalnum() or c in " -_()" else "_" for c in nome).strip()

contador = 0
for title, byline, content, capo, transpose in rows:
    if not title or not content:
        continue

    byline = byline or "Desconhecido"
    title = title.strip()
    byline = byline.strip()

    nome_arquivo = f"{limpar_nome(byline)} - {limpar_nome(title)}.txt"
    caminho_arquivo = os.path.join(pasta_saida, nome_arquivo)

    texto = content.replace('\\n', '\n').replace('\r\n', '\n').replace('\r', '\n')

    with open(caminho_arquivo, "w", encoding="utf-8") as f:
        #f.write(f"{byline}\n")
        #f.write(f"{title}\n\n")
        # f.write(f"Transposição: {transpose}, Capotraste: {capo}\n\n")
        f.write(texto.strip() + "\n")

    contador += 1

print(f"✅ {contador} músicas extraídas com sucesso para '{pasta_saida}/'.")

conn.close()


# Geração da lista index.json após extração
import json

caminho_txt = "txt"
arquivos_txt = sorted(f for f in os.listdir(caminho_txt) if f.endswith(".txt"))

with open(os.path.join(caminho_txt, "index.json"), "w", encoding="utf-8") as f:
    json.dump(arquivos_txt, f, ensure_ascii=False, indent=2)
    
 print("✅ JSON salvo com", len(arquivos_txt), "arquivos.")