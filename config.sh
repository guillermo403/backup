SCRIPT_PATH=$(dirname $(realpath $0))

DESTINATION_PATH=~/Documentos

LOG_FILE=$HOME/backup_out.log

FILES_TO_EXCLUDE="${SCRIPT_PATH}/exclude-files.txt"

DATE=$(date +%Y%m%d)

BACKUP_ORIGINAL_NAME="backup-${DATE}"