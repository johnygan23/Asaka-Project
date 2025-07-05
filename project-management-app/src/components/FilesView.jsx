import { FiDownload } from 'react-icons/fi';

const FilesView = ({ files = [], onFileClick }) => {
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (fileType) => {
    if (fileType.startsWith('image/')) return '🖼️';
    if (fileType.startsWith('video/')) return '🎥';
    if (fileType.startsWith('audio/')) return '🎵';
    if (fileType.includes('pdf')) return '📄';
    if (fileType.includes('word') || fileType.includes('document')) return '📝';
    if (fileType.includes('excel') || fileType.includes('spreadsheet')) return '📊';
    if (fileType.includes('powerpoint') || fileType.includes('presentation')) return '📈';
    return '📎';
  };

  const handleFileClick = (file) => {
    if (onFileClick) {
      onFileClick(file);
    } else {
      // Default behavior - open file in new tab
      if (file.url) {
        window.open(file.url, '_blank');
      }
    }
  };

  return (
    <div className="bg-white rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">All Files</h2>
        <div className="text-sm text-gray-500">
          {files.length} file{files.length !== 1 ? 's' : ''}
        </div>
      </div>
      
      {files.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📁</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No files yet</h3>
          <p className="text-gray-500">Files attached to tasks will appear here</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {files.map(file => (
            <div
              key={file.id}
              className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
              onClick={() => handleFileClick(file)}
            >
              <div className="text-3xl">{getFileIcon(file.type)}</div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-gray-900 truncate">{file.name}</div>
                <div className="text-sm text-gray-500">
                  {formatFileSize(file.size)} • {file.taskTitle}
                </div>
                <div className="text-xs text-gray-400">
                  {new Date(file.uploadedAt).toLocaleDateString()}
                </div>
              </div>
              <button
                className="p-2 text-gray-400 hover:text-gray-600"
                onClick={(e) => {
                  e.stopPropagation();
                  handleFileClick(file);
                }}
                aria-label="Download file"
              >
                <FiDownload size={20} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilesView; 