import os
import zipfile
import shutil
import subprocess

# 1. Procurar arquivo de backup
arquivos = [f for f in os.listdir(".") if f.startswith("OnSong") and f.endswith(".backup")and os.path.isfile(f)]
#arquivos = [f for f in os.listdir(".") if f.endswith(".backup") and os.path.isfile(f)]
if not arquivos:
    print("❌ Nenhum arquivo de backup '.backup' encontrado na pasta atual.")
    exit(1)

arquivo_backup = arquivos[0]
arquivo_zip = "OnSong.zip"

# 2. Renomear para .zip
if os.path.exists(arquivo_zip):
    print("ℹ️ Removendo zip antigo...")
    os.remove(arquivo_zip)

os.rename(arquivo_backup, arquivo_zip)
print(f"✅ '{arquivo_backup}' renomeado para '{arquivo_zip}'.")

# 3. Descompactar
pasta_destino = "OnSong"

# 🛑 Descomentar para apagar pasta antiga ao testar
# if os.path.exists(pasta_destino):
#     print("🧹 Apagando pasta OnSong anterior...")
#     shutil.rmtree(pasta_destino)

with zipfile.ZipFile(arquivo_zip, 'r') as zip_ref:
    zip_ref.extractall(pasta_destino)
    print(f"✅ Arquivo descompactado em '{pasta_destino}/'.")

# 4. Rodar script de extração
print("🚀 Iniciando extração das cifras...")
import sys
subprocess.run([sys.executable, "extrair_cifras.py"])

# 🛑 Descomentar para remover arquivos temporários
# os.remove(arquivo_zip)
# os.remove(arquivo_backup)

import webbrowser

caminho_index = os.path.abspath("leitor_html/index.html")
webbrowser.open(f"file://{caminho_index}")

