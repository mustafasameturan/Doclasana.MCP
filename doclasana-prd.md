# **Doclasana MCP Server - Ürün Gereksinimleri Dokümanı (PRD)**

**Doküman Sürümü:** 1.1  
**Statü:** Onaylandı  
**Ürün:** Doclasana MCP (Model Context Protocol) Server

---

### 1. Giriş ve Amaç

Bu doküman, geliştiricilerin kullandığı modern IDE'ler (Cursor, Cline, Windsurf vb.) içerisinden doğrudan Doclasana platformundaki dokümantasyonlarına erişmelerini sağlayacak olan **Doclasana MCP Sunucusu**'nun gereksinimlerini tanımlar.

**Temel Amaç:** Geliştiricilerin kodlama akışından ayrılmadan, ihtiyaç duydukları proje dokümanlarına hızlı, verimli ve bağlamsal bir şekilde ulaşmalarını sağlamaktır. Bu araç, doküman arama, görüntüleme ve değişiklik takibi gibi işlemleri IDE içindeki yapay zeka asistanı aracılığıyla "tool calling" yöntemiyle gerçekleştirecektir.

### 2. Hedef Kitle

-   **Yazılım Geliştiricileri:** Günlük iş akışlarında Cursor, Cline, Windsurf gibi yapay zeka destekli IDE'leri kullanan ve proje dokümantasyonlarına sıkça başvuran geliştiriciler.
-   **Teknik Ekipler:** Doclasana üzerinde merkezi dokümantasyon yönetimi yapan ve bu dokümanların geliştirme ortamında kolayca erişilebilir olmasını hedefleyen takımlar.

### 3. MVP Kapsamı ve Özellikler

Bu ürünün ilk versiyonu (MVP), geliştiricilerin en temel dokümantasyon yönetimi ihtiyaçlarını karşılamaya odaklanacaktır.

#### **3.1. MVP Kapsamındaki Özellikler**

Aşağıdaki özellikler ilk sürümde yer alacaktır:

*   **Güvenli Kimlik Doğrulama:** Kullanıcılar, kendilerine özel API anahtarları ile sisteme güvenli bir şekilde bağlanır.
*   **Dokümantasyon Listeleme:** Kullanıcılar, sahip oldukları tüm dokümanları sayfalama (pagination) desteği ile listeleyebilirler. Bu liste dosya adı, türü, boyutu ve tarihi gibi temel bilgileri içerir.
*   **Belirli Bir Dokümanı Görüntüleme:** Kullanıcılar, ID'sini belirttikleri bir dokümanın tam içeriğini ve meta verilerini doğrudan IDE içinde görüntüleyebilir.
*   **Doküman İçi Arama (Sunucu Taraflı):** Kullanıcılar, doküman içeriklerinde anahtar kelimelerle **sunucu tarafında** arama yaparak ilgili dokümanlara hızlıca ulaşabilirler. Bu, daha hızlı ve verimli bir arama deneyimi sunar.
*   **Değişiklik Takibi (Diff):** Bir dokümanın son erişimden bu yana geçirdiği değişiklikler (eklenen/silinen satırlar) `diff` formatında görüntülenebilir. Bu özellik, dokümantasyon güncellemelerinin takibini kolaylaştırır.
*   **Markdown (.md) Desteği:** Markdown formatındaki dokümanlar sorunsuz bir şekilde desteklenir.
*   **Anlaşılır Hata Yönetimi:** Geçersiz API anahtarı, yetki sorunları veya sunucu hataları gibi durumlarda kullanıcıya yol gösteren, anlaşılır hata mesajları sunulur.

#### **3.2. MVP Kapsamı Dışındaki Özellikler**

Aşağıdaki özellikler bu sürümde yer almayacak olup gelecek versiyonlar için planlanmaktadır:

*   IDE üzerinden mevcut bir dokümanı güncelleme.
*   IDE üzerinden yeni bir doküman oluşturma.
*   IDE üzerinden bir dokümanı silme.
*   Birden çok doküman üzerinde toplu işlem yapma (batch operations).

### 4. Kullanıcı Senaryoları

**Senaryo 1: Proje API Anahtarı Bilgisini Hızlıca Bulma**
1.  Geliştirici, kod yazarken API anahtarının nasıl kullanılacağını unuttu.
2.  IDE asistanına `search_documents(query: "API anahtarı")` komutunu verir.
3.  Sistem, sunucu tarafında arama yaparak "API anahtarı" içeren dokümanları listeler.
4.  Geliştirici, doğru dokümanın ID'sini alarak `get_document(id: "...")` komutuyla içeriği okur ve kod yazmaya devam eder.

**Senaryo 2: Dokümandaki Son Değişiklikleri Anlama**
1.  Geliştirici, bir hata düzeltme dokümanını bir hafta önce okumuştu.
2.  Dokümanın güncellenip güncellenmediğini merak ediyor.
3.  `diff_documents(documentId: "...")` komutunu çalıştırır.
4.  Sistem, dokümanın eski ve yeni versiyonu arasındaki farkları gösterir, böylece geliştirici sadece değişen kısımlara odaklanabilir.

**Senaryo 3: Projeye Yeni Başlayan Geliştiricinin Oryantasyonu**
1.  Ekibe yeni katılan bir geliştirici, projenin genel yapısını anlamak istiyor.
2.  `list_documents()` komutu ile mevcut tüm kurulum ve mimari dokümanlarını listeler.
3.  İlgisini çeken "Kurulum Rehberi" ve "Mimari Genel Bakış" gibi dokümanları `get_document` komutuyla okuyarak projeye hızla adapte olur.

### 5. Fonksiyonel Olmayan Gereksinimler

*   **Performans:** API çağrıları, kullanıcıyı bekletmeyecek şekilde optimize edilmelidir. Sunucu taraflı arama, istemci üzerindeki yükü ortadan kaldırır. Sık erişilen veriler için yerel önbellekleme (caching) mekanizmaları kullanılacaktır.
*   **Güvenlik:** Kullanıcı API anahtarları asla açık metin olarak saklanmamalı ve tüm iletişim HTTPS üzerinden şifreli olarak yapılmalıdır. Hata mesajlarında hassas bilgi sızdırılmamalıdır.
*   **Kullanılabilirlik:** Komutlar ve parametreleri anlaşılır olmalıdır. Komutların çıktıları, okunabilirliği artırmak için Markdown formatında ve temiz bir yapıda sunulmalıdır.
*   **Güvenilirlik:** Servis, API bağlantı hatalarını ve geçici sunucu sorunlarını yönetebilmeli ve bu durumlarda kullanıcıya bilgilendirici geri bildirimler sunmalıdır.

### 6. Kullanılacak API Endpoints

MCP sunucusu, işlevlerini yerine getirmek için aşağıdaki Doclasana API endpoint'lerini kullanacaktır. Tüm istekler `x-api-key` başlığı ile kimlik doğrulaması gerektirir.

#### **6.1. Dokümanları Listeleme**
-   **Endpoint:** `GET /api/v1/documents/my`
-   **Amaç:** Kimliği doğrulanmış kullanıcının tüm dokümanlarının meta verilerini sayfalama desteği ile listeler. Bu endpoint, dokümanların tam içeriğini döndürmez.
-   **Parametreler:**
    -   `page` (opsiyonel, sayı): Sayfa numarası.
    -   `pageSize` (opsiyonel, sayı): Sayfa başına doküman sayısı.
-   **Başarılı Yanıt:** Doküman ID'si, dosya adı, tarih gibi bilgileri içeren paginasyonlu bir doküman listesi.
-   **Hata Yanıtı:** Standart HTTP hata kodları (örn: 401 Unauthorized).

#### **6.2. Doküman İçeriğinde Arama**
-   **Endpoint:** `GET /api/v1/documents/search-content`
-   **Amaç:** Kullanıcının tüm dokümanlarının içeriğinde sunucu tarafında arama yapar ve eşleşen dokümanları tam içerikleriyle birlikte döndürür.
-   **Parametreler:**
    -   `searchTerm` (zorunlu, metin): Aranacak anahtar kelime.
    -   `page` (opsiyonel, sayı): Sayfa numarası.
    -   `pageSize` (opsiyonel, sayı): Sayfa başına doküman sayısı.
-   **Başarılı Yanıt:** Arama terimiyle eşleşen dokümanların tam içeriklerini içeren paginasyonlu bir liste.
-   **Hata Yanıtı (404 Not Found):** `{"title": "No documents found matching the search criteria", "status": 404}`

#### **6.3. Belirli Bir Dokümanı Getirme**
-   **Endpoint:** `GET /api/v1/documents/getDocumentById/{id}`
-   **Amaç:** Belirtilen ID'ye sahip tek bir dokümanın tüm detaylarını ve içeriğini getirir.
-   **Parametreler:**
    -   `id` (zorunlu, metin): Yol (path) üzerinde belirtilen doküman ID'si.
-   **Başarılı Yanıt:** `id`, `filename`, `content`, `timestamp` gibi tüm alanları içeren tek bir doküman nesnesi.
-   **Hata Yanıtı (404 Not Found):** `{"title": "Document not found", "status": 404}`

### 7. Gelecek Planı (Roadmap)

*   **Faz 2: Gelişmiş Özellikler**
    *   Doküman oluşturma, düzenleme ve silme.
    *   Etiketleme (tagging) ve bulanık (fuzzy) arama gibi gelişmiş arama yetenekleri.
    *   Doküman versiyon geçmişini görüntüleme.

*   **Faz 3: Kurumsal Özellikler**
    *   Takım bazlı doküman paylaşımı ve iş birliği.
    *   Rol ve yetki bazlı erişim kontrolleri.
    *   Değişiklikler için denetim (audit) günlükleri.