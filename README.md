# Doclasana MCP Server

[![NPM Version](https://img.shields.io/npm/v/doclasana-mcp-server.svg)](https://www.npmjs.com/package/doclasana-mcp-server)
[![NPM Downloads](https://img.shields.io/npm/dm/doclasana-mcp-server.svg)](https://www.npmjs.com/package/doclasana-mcp-server)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Doclasana belgelerinize Cursor, Cline ve Windsurf gibi AI destekli IDE'lerden doğrudan erişin.

## Özellikler

- Belgelerinizi listeleyin ve arayın
- Belge içeriklerini görüntüleyin
- Güvenli API anahtarı kimlik doğrulaması
- Tüm MCP uyumlu IDE'lerle çalışır

## Kurulum

### Seçenek 1: NPM (Önerilen)

```bash
npm install -g doclasana-mcp-server
```

### Seçenek 2: Kaynak Koddan

```bash
git clone https://github.com/mustafasameturan/Doclasana.MCP.git
cd Doclasana.MCP
npm install
npm run build
```

## Kurulum

### 1. API Anahtarınızı Alın
Doclasana hesap ayarlarınızdan API anahtarınızı alın.

### 2. IDE'nizi Yapılandırın

#### Cursor IDE
MCP ayarlarınıza şunu ekleyin:

```json
{
  "mcpServers": {
    "doclasana": {
      "command": "doclasana-mcp",
      "env": {
        "DOCLASANA_API_KEY": "api-anahtariniz-buraya"
      }
    }
  }
}
```

#### Kaynak Koddan Kurulum
Kaynak koddan kurulum yaptıysanız şunu kullanın:

```json
{
  "mcpServers": {
    "doclasana": {
      "command": "node",
      "args": ["/Doclasana.MCP/dizin/yolu/dist/index.js"],
      "env": {
        "DOCLASANA_API_KEY": "api-anahtariniz-buraya"
      }
    }
  }
}
```

### 3. Kullanmaya Başlayın
Yapılandırma tamamlandıktan sonra AI asistanınıza şunları sorabilirsiniz:
- "Belgelerimi listele"
- "API hakkında belgeler ara"
- "abc123 ID'li belgeyi getir"

## Kullanılabilir Komutlar

- `list_documents` - Tüm belgelerinizi sayfalama ile listeler
- `search_documents` - Belge içeriklerinde arama yapar
- `get_document` - Belirli bir belgenin tam içeriğini getirir

## Geliştirme

### Komutlar
- `npm run build` - TypeScript'i derle
- `npm run dev` - Geliştirme modunda çalıştır
- `npm start` - Sunucuyu başlat
- `npm test` - Testleri çalıştır

### Proje Yapısı
```
src/
├── index.ts          # Ana MCP sunucusu
└── global.d.ts       # Tip tanımları
dist/                 # Derlenmiş çıktı
```

## Lisans

MIT Lisansı - [LICENSE](LICENSE) dosyasına bakın.

## Destek

Sorularınız veya sorunlarınız için [GitHub Issues](https://github.com/mustafasameturan/Doclasana.MCP/issues) sayfasını ziyaret edin.