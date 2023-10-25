# Backups linux

Script para hacer backups en Linux

# USO

Ejecutar con el comando
```bash
bash backup.sh
```

# ARCHIVOS DE CONFIGURACIÓN

  - **exclude-files.txt**\
    Especificar archivos a excluir de la copia de seguridad.
    Un directorio o archivo por línea
```
node_modules
.git
package-lock.json
pnpm-lock.yaml
```

- **colors.sh**\
  Aquí están definidos los colores que se usan para los logs
```bash
ENDCOLOR='\033[0m'        # Text Reset
RED='\033[0;31m'          # Red
GREEN='\033[0;32m'        # Green
YELLOW='\033[0;33m'       # Yellow
BLUE='\033[0;34m'         # Blue
CYAN='\033[0;36m'         # Cyan
```

- **config.sh**\
  Variables de configuración del script\
  Estas variables son necesarias para el uso correcto del script
```bash
SCRIPT_PATH=$(dirname $(realpath $0)) # <-- La ruta absoluta a la carpeta del script
DESTINATION_PATH=~/Documentos # <-- La ruta de la que se quiere hacer la copia de seguridad, se hará de todos los archivos y directorios en esa ruta
LOG_FILE=$HOME/backup_out.log # <-- La ruta al archivo log
FILES_TO_EXCLUDE="${SCRIPT_PATH}/exclude-files.txt" # <-- La ruta al archivo con los excluidos, por defecto está en la misma ruta
DATE=$(date +%Y%m%d) # <-- La fecha en formato YYYYMMDD, se usa para el nombre del archivo al hacer la copia de seguridad
BACKUP_ORIGINAL_NAME="backup-${DATE}" # <-- El nombre del archivo
```