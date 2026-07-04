const cat = 'media'
const icon = 'logo-default.svg'

export const mediaTools = [
  { id: 'decibel-meter', name: '分贝噪音测试仪', desc: '实时显示环境分贝', icon: 'logo-decibel-meter.svg', category: cat, type: 'decibel-meter' },
  { id: 'audio-recorder', name: '在线录音助手', desc: '麦克风实时录音', icon, category: cat, type: 'audio-recorder' },
  { id: 'audio-player', name: '本地音乐播放器', desc: '本地音频播放', icon, category: cat, type: 'audio-player' },
  { id: 'video-player', name: '本地视频播放器', desc: '本地视频播放', icon, category: cat, type: 'video-player' },
  { id: 'text-to-speech', name: '文字转语音工具', desc: '文本转语音朗读', icon, category: cat, type: 'text-to-speech' },
  { id: 'screen-recorder', name: '屏幕录制器', desc: 'WebM屏幕录制', icon, category: cat, type: 'screen-recorder' },
  { id: 'audio-convert', name: '音频格式转换', desc: 'WAV/MP3等格式互转', icon, category: cat, type: 'audio-convert' },
  { id: 'video-mute', name: '视频去除音频', desc: '移除视频音轨', icon, category: cat, type: 'video-mute' },
  { id: 'alipay-voice', name: '支付宝到账语音', desc: '合成到账语音', icon, category: cat, type: 'alipay-voice' },
  { id: 'video-to-wav', name: '视频转 WAV', desc: '提取 WAV 音轨', icon, category: cat, type: 'video-to-wav' },
  { id: 'flac-to-mp3', name: 'FLAC 转 MP3', desc: '无损转 MP3', icon, category: cat, type: 'audio-convert', from: 'flac', to: 'mp3' },
  { id: 'ogg-to-mp3', name: 'OGG 转 MP3', desc: 'OGG 转 MP3', icon, category: cat, type: 'audio-convert', from: 'ogg', to: 'mp3' },
  { id: 'mp3-to-wav', name: 'MP3 转 WAV', desc: 'MP3 转 WAV', icon, category: cat, type: 'audio-convert', from: 'mp3', to: 'wav' },
  { id: 'mp3-to-ogg', name: 'MP3 转 OGG', desc: 'MP3 转 OGG', icon, category: cat, type: 'audio-convert', from: 'mp3', to: 'ogg' },
  { id: 'wav-to-mp3', name: 'WAV 转 MP3', desc: 'WAV 转 MP3', icon, category: cat, type: 'audio-convert', from: 'wav', to: 'mp3' },
  { id: 'classic-songs', name: '经典歌曲在线播放', desc: '在线音乐播放列表', icon, category: cat, type: 'classic-songs' },
]
