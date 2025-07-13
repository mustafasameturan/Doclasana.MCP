# Doclasana MCP Server

Bu MCP (Model Context Protocol) server, geliştiricilerin Cursor, Cline, Windsurf gibi yapay zeka destekli IDE'lerde doğrudan Doclasana platformundaki dokümantasyonlarına erişebilmelerini sağlar.

## Özellikler

- **Güvenli Kimlik Doğrulama**: API anahtarı ile güvenli bağlantı
- **Dokümantasyon Listeleme**: Sayfalama desteği ile tüm dokümanları listeleme
- **Doküman Görüntüleme**: Belirli bir dokümanın tam içeriğini görüntüleme
- **İçerik Arama**: Doküman içeriklerinde sunucu taraflı arama
- **Markdown Desteği**: Markdown formatındaki dokümanların tam desteği
- **Hata Yönetimi**: Anlaşılır ve kullanıcı dostu hata mesajları

## Kurulum

### 1. Bağımlılıkları Yükleyin

```bash
npm install
```

### 2. Projeyi Derleyin

```bash
npm run build
```

### 3. MCP Server'ı Başlatın

```bash
npm start
```

Geliştirme modunda çalıştırmak için:
```bash
npm run dev
```

**Not:** API anahtarı server başlangıcında değil, IDE konfigürasyonunda belirtilir.

## IDE Yapılandırması

### Cursor IDE

`claude_desktop_config.json` dosyanıza aşağıdaki yapılandırmayı ekleyin:

```json
{
  "mcpServers": {
    "doclasana": {
      "command": "node",
      "args": ["/Users/mustafasameturan/Projects/Mcp/doclasana-mcp/dist/index.js"],
      "env": {
        "DOCLASANA_API_KEY": "your-actual-doclasana-api-key"
      }
    }
  }
}
```

**Önemli:** 
- `args` path'ini kendi proje dizininize göre güncelleyin
- `DOCLASANA_API_KEY` değerini gerçek API anahtarınızla değiştirin

### Diğer MCP Destekli IDE'ler

Diğer IDE'lerde de benzer şekilde MCP server'ınızı konfigüre edebilirsiniz. Node.js komutunu ve gerekli ortam değişkenlerini belirtmeniz yeterlidir.

## Kullanım

Bu MCP server aşağıdaki tool'ları sağlar:

### 1. `list_documents`

Kullanıcının erişebildiği tüm dokümanları listeler.

**Parametreler:**
- `page` (opsiyonel): Sayfa numarası (varsayılan: 1)
- `pageSize` (opsiyonel): Sayfa başına doküman sayısı (varsayılan: 20, maksimum: 100)

**Örnek:**
```
Dokümanlarımı listele
```

### 2. `search_documents`

Doküman içeriklerinde anahtar kelime araması yapar.

**Parametreler:**
- `searchTerm` (zorunlu): Aranacak anahtar kelime
- `page` (opsiyonel): Sayfa numarası (varsayılan: 1)
- `pageSize` (opsiyonel): Sayfa başına doküman sayısı (varsayılan: 20, maksimum: 100)

**Örnek:**
```
"API anahtarı" ile ilgili dokümanları ara
```

### 3. `get_document`

Belirli bir dokümanın tam içeriğini getirir.

**Parametreler:**
- `id` (zorunlu): Doküman ID'si

**Örnek:**
```
ID'si "abc123" olan dokümanı getir
```

## Kullanım Senaryoları

### Senaryo 1: Proje Dokümantasyonunu Keşfetme
1. IDE'nizde yapay zeka asistanına "Dokümanlarımı listele" diyerek tüm dokümanları görüntüleyin
2. İlginizi çeken bir dokümanın ID'sini not alın
3. "ID'si [document-id] olan dokümanı getir" komutu ile tam içeriği okuyun

### Senaryo 2: Belirli Bilgi Arama
1. "API kullanımı" gibi bir anahtar kelime ile arama yapın
2. Bulunan sonuçlarda ilgili dokümanı seçin
3. Gerekirse tam içeriği görüntüleyin

### Senaryo 3: Güncel Bilgileri Takip Etme
1. Düzenli olarak dokümanları listeleyin
2. Değişiklik tarihlerine bakarak güncellenmiş dokümanları tespit edin
3. Güncellenmiş dokümanların tam içeriğini inceleyin

## Hata Çözümleme

### API Anahtarı Hatası
- IDE konfigürasyonunda `DOCLASANA_API_KEY` değerinin doğru ayarlandığından emin olun
- API anahtarınızın geçerli ve aktif olduğunu kontrol edin
- Tool çağrısı sırasında "DOCLASANA_API_KEY environment variable is required" hatası alıyorsanız, IDE konfigürasyonunuzu kontrol edin

### Bağlantı Hatası
- İnternet bağlantınızı kontrol edin
- Doclasana API servisinin çalışır durumda olduğunu doğrulayın

### Yetki Hatası
- API anahtarınızın dokümanlar için gerekli izinlere sahip olduğunu kontrol edin

## Geliştirme

### Test Çalıştırma
```bash
npm test
```

### Proje Yapısı
```
doclasana-mcp-server/
├── src/
│   ├── index.ts          # Ana MCP server kodu
│   └── global.d.ts       # TypeScript tip tanımları
├── dist/                 # Derlenmiş JavaScript dosyları
├── package.json          # Proje bağımlılıkları
├── tsconfig.json         # TypeScript yapılandırması
└── README.md            # Bu dosya
```

## Katkıda Bulunma

1. Bu repoyu fork edin
2. Özellik dalı oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add some amazing feature'`)
4. Dalınıza push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Daha fazla bilgi için `LICENSE` dosyasına bakın.

## Destek

Herhangi bir sorunuz veya öneriniz varsa, lütfen [GitHub Issues](https://github.com/doclasana/doclasana-mcp-server/issues) sayfasından iletişime geçin.

## Sürüm Geçmişi

### v1.0.0
- İlk MVP sürümü
- Temel doküman listeleme, arama ve görüntüleme özellikleri
- API anahtarı ile güvenli kimlik doğrulama
- Markdown doküman desteği 