# Backups linux

<large>
  Script para hacer backups en Linux
</large>

<small>
  En el archivo 'exclude-files.txt' se ponen los archivos a excluir, uno por línea
</small>
```
node_modules
.git
package-lock.json
pnpm-lock.yaml
```

<small>
  En 'colors.sh' están definidos los colores
</small>

<small>
  Y en 'config.sh' están definidos las configuraciones del script
</small>
```bash
# Estas variables son necesarias para el uso correcto del script

SCRIPT_PATH=$(dirname $(realpath $0))
DESTINATION_PATH=~/Documentos # <-- La ruta de la que se quiere hacer la copia de seguridad, se hará de todos los archivos y directorios en esa ruta
LOG_FILE=$HOME/backup_out.log # <-- La ruta al archivo log
FILES_TO_EXCLUDE="${SCRIPT_PATH}/exclude-files.txt" # <-- La ruta al archivo con los excluidos, por defecto está en la misma ruta
DATE=$(date +%Y%m%d) # La fecha en formato YYYYMMDD, se usa para el nombre del archivo al hacer la copia de seguridad
BACKUP_ORIGINAL_NAME="backup-${DATE}" # El nombre del archivo
```