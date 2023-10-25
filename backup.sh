#!/bin/bash

### COLORS ###
# Reset color
ENDCOLOR='\033[0m'       # Text Reset
# Regular Colors
BLACK='\033[0;30m'        # Black
RED='\033[0;31m'          # Red
GREEN='\033[0;32m'        # Green
YELLOW='\033[0;33m'       # Yellow
BLUE='\033[0;34m'         # Blue
PURPLE='\033[0;35m'       # Purple
CYAN='\033[0;36m'         # Cyan
WHITE='\033[0;37m'        # White
# Bold
BBLACK='\033[1;30m'       # Black
BRED='\033[1;31m'         # Red
BGREEN='\033[1;32m'       # Green
BYELLOW='\033[1;33m'      # Yellow
BBLUE='\033[1;34m'        # Blue
BPURPLE='\033[1;35m'      # Purple
BCYAN='\033[1;36m'        # Cyan
BWHITE='\033[1;37m'       # White
### END COLORS ###

SCRIPT_PATH=$(dirname $(realpath $0))
DESTINATION_PATH=~/Documentos
LOG_FILE=$HOME/backup_out.log
FILES_TO_EXCLUDE="${SCRIPT_PATH}/exclude-files.txt"
# Obtenemos la fecha actual en formato YYYYMMDD
printf -v DATE '%(%Y%m%d)T' -1
BACKUP_PATH="${SCRIPT_PATH}/backup-${DATE}.tar.gz"

function log {
  if [ ! -f $LOG_FILE ]
  then
    touch $LOG_FILE
  fi

  if [ ! -w $LOG_FILE ]
  then
    echo "El archivo $LOG_FILE no tiene permisos de escritura"
    exit 1
  fi

  # Validamos el tipo de mensaje
  VALID_TYPES=(INFO ERROR WARNING SUCCESS)
  type="$2"
  # Si el tipo de mensaje no es válido, por defecto será INFO
  if [[ ! " ${VALID_TYPES[@]} " =~ " ${type} " ]]
  then
    type="INFO"
  fi

  # Asignamos un color a cada tipo de mensaje
  if [ "$type" = "ERROR" ]; then
    typecolor=$RED
  elif [ "$type" = "WARNING" ]; then
    typecolor=$YELLOW
  elif [ "$type" = "SUCCESS" ]; then
    typecolor=$GREEN  
  else
    typecolor=$CYAN
  fi

  # Escribimos el mensaje en el archivo de log
  echo -e "${BLUE}[$(date)]${ENDCOLOR} |${typecolor}${type}${ENDCOLOR}| # $1" >> $LOG_FILE
}

function check_files_to_exclude {
  if [ ! -f $FILES_TO_EXCLUDE ]
  then
    log "El archivo $FILES_TO_EXCLUDE no existe" "ERROR"
    exit 1
  fi
}

function check_destination_path {
  if [ ! -d $DESTINATION_PATH ]
  then
    log "El directorio $DESTINATION_PATH no existe" "ERROR"
    exit 1
  fi
}

function check_backup_path {
  if [ -f $BACKUP_PATH ]
  then
    log "El archivo $BACKUP_PATH ya existe" "ERROR"
    exit 1
  fi
}

function main {
  check_files_to_exclude
  check_destination_path
  check_backup_path

  log "Inicio de la ejecución del script"

  # Nos movemos al directorio donde queremos crear la copia de seguridad
  cd $DESTINATION_PATH

  # Empaquetamos los archivos y directorios que queremos copiar
  tar --exclude-from=$FILES_TO_EXCLUDE -zcvf $BACKUP_PATH * &> /dev/null

  # Comprobamos si la copia de seguridad se ha creado correctamente
  if [ $? -eq 0 ]
  then
      log "Copia de seguridad creada correctamente en: ${BACKUP_PATH}" "SUCCESS"
  else
      log "Error al crear la copia de seguridad" "ERROR"
  fi

  log "Fin de la ejecución del script"
}

main