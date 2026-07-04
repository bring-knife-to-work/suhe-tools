// MD5 implementation (minimal)
function md5cycle(x, k) {
  let [a, b, c, d] = x
  const ff = (a, b, c, d, x, s, t) => { const n = a + ((b & c) | (~b & d)) + x + t; return ((n << s) | (n >>> (32 - s))) + b }
  const gg = (a, b, c, d, x, s, t) => { const n = a + ((b & d) | (c & ~d)) + x + t; return ((n << s) | (n >>> (32 - s))) + b }
  const hh = (a, b, c, d, x, s, t) => { const n = a + (b ^ c ^ d) + x + t; return ((n << s) | (n >>> (32 - s))) + b }
  const ii = (a, b, c, d, x, s, t) => { const n = a + (c ^ (b | ~d)) + x + t; return ((n << s) | (n >>> (32 - s))) + b }
  a = ff(a,b,c,d,k[0],7,-680876936); d = ff(d,a,b,c,k[1],12,-389564586); c = ff(c,d,a,b,k[2],17,606105819); b = ff(b,c,d,a,k[3],22,-1044525330)
  a = ff(a,b,c,d,k[4],7,-176418897); d = ff(d,a,b,c,k[5],12,1200080426); c = ff(c,d,a,b,k[6],17,-1473231341); b = ff(b,c,d,a,k[7],22,-45705983)
  a = ff(a,b,c,d,k[8],7,1770035416); d = ff(d,a,b,c,k[9],12,-1958414417); c = ff(c,d,a,b,k[10],17,-42063); b = ff(b,c,d,a,k[11],22,-1990404162)
  a = ff(a,b,c,d,k[12],7,1804603682); d = ff(d,a,b,c,k[13],12,-40341101); c = ff(c,d,a,b,k[14],17,-1502002290); b = ff(b,c,d,a,k[15],22,1236535329)
  a = gg(a,b,c,d,k[1],5,-165796510); d = gg(d,a,b,c,k[6],9,-1069501632); c = gg(c,d,a,b,k[11],14,643717713); b = gg(b,c,d,a,k[0],20,-373897302)
  a = gg(a,b,c,d,k[5],5,-701558691); d = gg(d,a,b,c,k[10],9,38016083); c = gg(c,d,a,b,k[15],14,-660478335); b = gg(b,c,d,a,k[4],20,-405537848)
  a = gg(a,b,c,d,k[9],5,568446438); d = gg(d,a,b,c,k[14],9,-1019803690); c = gg(c,d,a,b,k[3],14,-187363961); b = gg(b,c,d,a,k[8],20,1163531501)
  a = gg(a,b,c,d,k[13],5,-1444681467); d = gg(d,a,b,c,k[2],9,-51403784); c = gg(c,d,a,b,k[7],14,1735328473); b = gg(b,c,d,a,k[12],20,-1926607734)
  a = hh(a,b,c,d,k[5],4,-378558); d = hh(d,a,b,c,k[8],11,-2022574463); c = hh(c,d,a,b,k[11],16,1839030562); b = hh(b,c,d,a,k[14],23,-35309556)
  a = hh(a,b,c,d,k[1],4,-1530992060); d = hh(d,a,b,c,k[4],11,1272893353); c = hh(c,d,a,b,k[7],16,-155497632); b = hh(b,c,d,a,k[10],23,-1094730640)
  a = hh(a,b,c,d,k[13],4,681279174); d = hh(d,a,b,c,k[0],11,-358537222); c = hh(c,d,a,b,k[3],16,-722521979); b = hh(b,c,d,a,k[6],23,76029189)
  a = hh(a,b,c,d,k[9],4,-640364487); d = hh(d,a,b,c,k[12],11,-421815835); c = hh(c,d,a,b,k[15],16,530742520); b = hh(b,c,d,a,k[2],23,-995338651)
  a = ii(a,b,c,d,k[0],6,-198630844); d = ii(d,a,b,c,k[7],10,1126891415); c = ii(c,d,a,b,k[14],15,-1416354905); b = ii(b,c,d,a,k[5],21,-57434055)
  a = ii(a,b,c,d,k[12],6,1700485571); d = ii(d,a,b,c,k[3],10,-1894986606); c = ii(c,d,a,b,k[10],15,-1051523); b = ii(b,c,d,a,k[1],21,-2054922799)
  a = ii(a,b,c,d,k[8],6,1873313359); d = ii(d,a,b,c,k[15],10,-30611744); c = ii(c,d,a,b,k[6],15,-1560198380); b = ii(b,c,d,a,k[13],21,1309151649)
  a = ii(a,b,c,d,k[4],6,-145523070); d = ii(d,a,b,c,k[11],10,-1120210379); c = ii(c,d,a,b,k[2],15,718787259); b = ii(b,c,d,a,k[9],21,-343485551)
  x[0] = (a + x[0]) | 0; x[1] = (b + x[1]) | 0; x[2] = (c + x[2]) | 0; x[3] = (d + x[3]) | 0
}

function md5blk(s) {
  const md5blks = []
  for (let i = 0; i < 64; i += 4) md5blks[i >> 2] = s.charCodeAt(i) + (s.charCodeAt(i + 1) << 8) + (s.charCodeAt(i + 2) << 16) + (s.charCodeAt(i + 3) << 24)
  return md5blks
}

function md51(s) {
  const n = s.length
  const state = [1732584193, -271733879, -1732584194, 271733878]
  let i
  for (i = 64; i <= n; i += 64) md5cycle(state, md5blk(s.substring(i - 64, i)))
  s = s.substring(i - 64)
  const tail = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
  for (i = 0; i < s.length; i++) tail[i >> 2] |= s.charCodeAt(i) << ((i % 4) << 3)
  tail[i >> 2] |= 0x80 << ((i % 4) << 3)
  if (i > 55) { md5cycle(state, tail); for (i = 0; i < 16; i++) tail[i] = 0 }
  tail[14] = n * 8
  md5cycle(state, tail)
  return state
}

function rhex(n) { return ('0' + ((n >>> 0) & 0xff).toString(16)).slice(-2) }
function hex(x) { return x.map(rhex).join('') }

export function md5(s) { return hex(md51(unescape(encodeURIComponent(s)))) }

const MORSE = { A:'.-',B:'-...',C:'-.-.',D:'-..',E:'.',F:'..-.',G:'--.',H:'....',I:'..',J:'.---',K:'-.-',L:'.-..',M:'--',N:'-.',O:'---',P:'.--.',Q:'--.-',R:'.-.',S:'...',T:'-',U:'..-',V:'...-',W:'.--',X:'-..-',Y:'-.--',Z:'--..',0:'-----',1:'.----',2:'..---',3:'...--',4:'....-',5:'.....',6:'-....',7:'--...',8:'---..',9:'----.', '.':'/','/':' ' }
const RMORSE = Object.fromEntries(Object.entries(MORSE).map(([k,v]) => [v,k]))

export function morseEncode(t) { return t.toUpperCase().split('').map(c => MORSE[c] || c).join(' ') }
export function morseDecode(t) { return t.split(' ').map(c => RMORSE[c] || c).join('') }

export function base64Encode(t) { return btoa(unescape(encodeURIComponent(t))) }
export function base64Decode(t) { return decodeURIComponent(escape(atob(t))) }

export function urlEncode(t, decode) { return decode ? decodeURIComponent(t) : encodeURIComponent(t) }

export function htmlEntity(t, decode) {
  if (decode) {
    const el = document.createElement('textarea')
    el.innerHTML = t
    return el.value
  }
  return t.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')
}

export function jwtDecode(t) {
  const parts = t.split('.')
  if (parts.length < 2) throw new Error('无效 JWT')
  const decode = p => JSON.parse(atob(p.replace(/-/g,'+').replace(/_/g,'/')))
  return JSON.stringify({ header: decode(parts[0]), payload: decode(parts[1]) }, null, 2)
}

export async function shaHash(t, algo = 'SHA-256') {
  const buf = await crypto.subtle.digest(algo, new TextEncoder().encode(t))
  return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2,'0')).join('')
}

export function textToBinary(t) { return [...t].map(c => c.charCodeAt(0).toString(2).padStart(8,'0')).join(' ') }
export function binaryToText(t) { return t.split(/\s+/).map(b => String.fromCharCode(parseInt(b,2))).join('') }
export function textToHex(t) { return [...t].map(c => c.charCodeAt(0).toString(16).padStart(2,'0')).join(' ') }
export function hexToText(t) { return t.split(/\s+/).map(h => String.fromCharCode(parseInt(h,16))).join('') }

export function randomPassword(len = 16, opts = { upper: true, lower: true, num: true, sym: true }) {
  let chars = ''
  if (opts.lower) chars += 'abcdefghijklmnopqrstuvwxyz'
  if (opts.upper) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  if (opts.num) chars += '0123456789'
  if (opts.sym) chars += '!@#$%^&*'
  return Array.from({ length: len }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
}

export function passwordEntropy(pwd) {
  let pool = 0
  if (/[a-z]/.test(pwd)) pool += 26
  if (/[A-Z]/.test(pwd)) pool += 26
  if (/\d/.test(pwd)) pool += 10
  if (/[^a-zA-Z0-9]/.test(pwd)) pool += 32
  const entropy = pwd.length * Math.log2(pool || 1)
  return `字符池: ${pool}\n熵值: ${entropy.toFixed(1)} bits\n强度: ${entropy < 40 ? '弱' : entropy < 60 ? '中' : '强'}`
}

export function utf8Escape(t, decode) {
  if (decode) return t.replace(/\\u([0-9a-fA-F]{4})/g, (_, h) => String.fromCharCode(parseInt(h, 16)))
  return [...t].map(c => { const cp = c.codePointAt(0); return cp > 127 ? '\\u' + cp.toString(16).padStart(4,'0') : c }).join('')
}

export function jsEscape(t) { return t.replace(/\\/g,'\\\\').replace(/'/g,"\\'").replace(/"/g,'\\"').replace(/\n/g,'\\n') }

export function jsObfuscate(code) {
  return code.split('').map(c => '\\x' + c.charCodeAt(0).toString(16).padStart(2,'0')).join('')
}

const B32 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567'
export function base32Encode(t) {
  const bytes = new TextEncoder().encode(t)
  let bits = '', out = ''
  for (const b of bytes) bits += b.toString(2).padStart(8,'0')
  for (let i = 0; i < bits.length; i += 5) out += B32[parseInt(bits.slice(i, i + 5).padEnd(5,'0'), 2)]
  return out
}

export function ipToInt(ip) {
  return ip.split('.').reduce((a, b) => (a << 8) + +b, 0) >>> 0
}
export function intToIp(n) {
  return [(n>>>24)&255,(n>>>16)&255,(n>>>8)&255,n&255].join('.')
}
