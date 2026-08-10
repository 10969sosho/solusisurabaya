// PROGRAM BARBERSHOP - JavaScript Application
// Dummy data and functionality for barbershop POS system

// Global Variables
let cart = [];
let customers = [];
let transactions = [];
let loyaltyData = [];

// Dummy data initialization
const services = [
    { id: 1, name: 'Potong Rambut', price: 25000, category: 'service' },
    { id: 2, name: 'Cuci', price: 15000, category: 'service' },
    { id: 3, name: 'Creambath', price: 35000, category: 'service' },
    { id: 4, name: 'Styling', price: 20000, category: 'service' },
    { id: 5, name: 'Fade Cut', price: 30000, category: 'service' },
    { id: 6, name: 'Beard Trim', price: 15000, category: 'service' }
];

const products = [
    { id: 7, name: 'Pomade', price: 45000, category: 'product' },
    { id: 8, name: 'Shampoo', price: 35000, category: 'product' },
    { id: 9, name: 'Hair Gel', price: 25000, category: 'product' },
    { id: 10, name: 'Hair Spray', price: 30000, category: 'product' },
    { id: 11, name: 'Conditioner', price: 40000, category: 'product' },
    { id: 12, name: 'Hair Oil', price: 50000, category: 'product' }
];

// Initialize dummy data
function initializeDummyData() {
    // Dummy customers
    customers = [
        {
            id: 1,
            name: 'Ahmad Rizki',
            phone: '081234567890',
            barber: 'Budi',
            lastService: 'Potong Rambut',
            lastVisit: '2024-01-15',
            visits: 5
        },
        {
            id: 2,
            name: 'Siti Nurhaliza',
            phone: '081234567891',
            barber: 'Andi',
            lastService: 'Creambath',
            lastVisit: '2024-01-14',
            visits: 3
        },
        {
            id: 3,
            name: 'Budi Santoso',
            phone: '081234567892',
            barber: 'Rian',
            lastService: 'Styling',
            lastVisit: '2024-01-13',
            visits: 8
        },
        {
            id: 4,
            name: 'Dewi Sartika',
            phone: '081234567893',
            barber: 'Budi',
            lastService: 'Potong Rambut',
            lastVisit: '2024-01-12',
            visits: 2
        },
        {
            id: 5,
            name: 'Eko Prasetyo',
            phone: '081234567894',
            barber: 'Andi',
            lastService: 'Fade Cut',
            lastVisit: '2024-01-11',
            visits: 6
        },
        {
            id: 6,
            name: 'Fajar Nugroho',
            phone: '081234567895',
            barber: 'Rian',
            lastService: 'Beard Trim',
            lastVisit: '2024-01-10',
            visits: 4
        },
        {
            id: 7,
            name: 'Gita Sari',
            phone: '081234567896',
            barber: 'Budi',
            lastService: 'Creambath',
            lastVisit: '2024-01-09',
            visits: 7
        },
        {
            id: 8,
            name: 'Hendra Wijaya',
            phone: '081234567897',
            barber: 'Andi',
            lastService: 'Fade Cut',
            lastVisit: '2024-01-08',
            visits: 3
        }
    ];

    // Dummy loyalty data
    loyaltyData = customers.map(customer => ({
        ...customer,
        points: customer.visits * 10,
        status: customer.visits >= 5 ? 'VIP' : customer.visits >= 3 ? 'Loyalty' : 'Regular'
    }));

    // Dummy transactions - more comprehensive data
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const twoDaysAgo = new Date(today);
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
    
    transactions = [
        { id: 1, customer: 'Ahmad Rizki', barber: 'Budi', total: 40000, date: today.toISOString().split('T')[0], items: ['Potong Rambut', 'Pomade'] },
        { id: 2, customer: 'Siti Nurhaliza', barber: 'Andi', total: 50000, date: today.toISOString().split('T')[0], items: ['Creambath', 'Shampoo'] },
        { id: 3, customer: 'Budi Santoso', barber: 'Rian', total: 35000, date: today.toISOString().split('T')[0], items: ['Styling', 'Hair Gel'] },
        { id: 4, customer: 'Dewi Sartika', barber: 'Budi', total: 60000, date: today.toISOString().split('T')[0], items: ['Potong Rambut', 'Creambath', 'Conditioner'] },
        { id: 5, customer: 'Eko Prasetyo', barber: 'Andi', total: 45000, date: today.toISOString().split('T')[0], items: ['Fade Cut', 'Hair Spray'] },
        { id: 6, customer: 'Fajar Nugroho', barber: 'Rian', total: 30000, date: yesterday.toISOString().split('T')[0], items: ['Beard Trim', 'Hair Oil'] },
        { id: 7, customer: 'Gita Sari', barber: 'Budi', total: 55000, date: yesterday.toISOString().split('T')[0], items: ['Creambath', 'Shampoo', 'Conditioner'] },
        { id: 8, customer: 'Hendra Wijaya', barber: 'Andi', total: 40000, date: yesterday.toISOString().split('T')[0], items: ['Fade Cut', 'Pomade'] },
        { id: 9, customer: 'Ahmad Rizki', barber: 'Budi', total: 25000, date: twoDaysAgo.toISOString().split('T')[0], items: ['Potong Rambut'] },
        { id: 10, customer: 'Siti Nurhaliza', barber: 'Andi', total: 70000, date: twoDaysAgo.toISOString().split('T')[0], items: ['Creambath', 'Styling', 'Hair Oil'] }
    ];
}

// Page Navigation
function showPage(pageName) {
    // Hide all pages
    const pages = document.querySelectorAll('.page-content');
    pages.forEach(page => page.classList.add('d-none'));
    
    // Show selected page
    const selectedPage = document.getElementById(pageName + '-page');
    if (selectedPage) {
        selectedPage.classList.remove('d-none');
        selectedPage.classList.add('fade-in');
    }
    
    // Update navigation
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => link.classList.remove('active'));
    
    // Find and activate the correct nav link
    const activeLink = document.querySelector(`[onclick="showPage('${pageName}')"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
    
    // Load page-specific data
    switch(pageName) {
        case 'kasir':
            loadKasirPage();
            break;
        case 'pelanggan':
            loadPelangganPage();
            break;
        case 'laporan':
            loadLaporanPage();
            break;
        case 'loyalty':
            loadLoyaltyPage();
            break;
    }
}

// Kasir Page Functions
function loadKasirPage() {
    loadServices();
    loadProducts();
    updateCart();
    updateTotal();
}

function loadServices() {
    const servicesList = document.getElementById('servicesList');
    servicesList.innerHTML = '';
    
    services.forEach(service => {
        const serviceCard = document.createElement('div');
        serviceCard.className = 'col-md-4 col-sm-6 mb-3';
        serviceCard.innerHTML = `
            <div class="service-card" onclick="addToCart(${service.id}, '${service.name}', ${service.price}, 'service')">
                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <h6 class="mb-1">${service.name}</h6>
                        <small class="text-muted">Layanan</small>
                    </div>
                    <div class="text-end">
                        <h6 class="mb-0 text-primary">Rp ${service.price.toLocaleString()}</h6>
                    </div>
                </div>
            </div>
        `;
        servicesList.appendChild(serviceCard);
    });
}

function loadProducts() {
    const productsList = document.getElementById('productsList');
    productsList.innerHTML = '';
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'col-md-4 col-sm-6 mb-3';
        productCard.innerHTML = `
            <div class="product-card" onclick="addToCart(${product.id}, '${product.name}', ${product.price}, 'product')">
                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <h6 class="mb-1">${product.name}</h6>
                        <small class="text-muted">Produk</small>
                    </div>
                    <div class="text-end">
                        <h6 class="mb-0 text-success">Rp ${product.price.toLocaleString()}</h6>
                    </div>
                </div>
            </div>
        `;
        productsList.appendChild(productCard);
    });
}

function addToCart(id, name, price, type) {
    const existingItem = cart.find(item => item.id === id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: id,
            name: name,
            price: price,
            quantity: 1,
            type: type
        });
    }
    
    updateCart();
    updateTotal();
    
    // Visual feedback
    const card = event.currentTarget;
    card.classList.add('selected');
    setTimeout(() => card.classList.remove('selected'), 300);
}

function updateCart() {
    const cartTable = document.getElementById('cartTable');
    cartTable.innerHTML = '';
    
    if (cart.length === 0) {
        cartTable.innerHTML = '<tr><td colspan="5" class="text-center text-muted">Keranjang kosong</td></tr>';
        return;
    }
    
    cart.forEach((item, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>
                <div class="input-group input-group-sm">
                    <button class="btn btn-outline-secondary" onclick="updateQuantity(${index}, -1)">-</button>
                    <input type="number" class="form-control text-center" value="${item.quantity}" min="1" onchange="setQuantity(${index}, this.value)">
                    <button class="btn btn-outline-secondary" onclick="updateQuantity(${index}, 1)">+</button>
                </div>
            </td>
            <td>Rp ${item.price.toLocaleString()}</td>
            <td>Rp ${(item.price * item.quantity).toLocaleString()}</td>
            <td>
                <button class="btn btn-danger btn-sm" onclick="removeFromCart(${index})">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        cartTable.appendChild(row);
    });
}

function updateQuantity(index, change) {
    cart[index].quantity += change;
    if (cart[index].quantity < 1) {
        cart[index].quantity = 1;
    }
    updateCart();
    updateTotal();
}

function setQuantity(index, value) {
    cart[index].quantity = parseInt(value) || 1;
    if (cart[index].quantity < 1) {
        cart[index].quantity = 1;
    }
    updateCart();
    updateTotal();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
    updateTotal();
}

function updateTotal() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const discountAmount = parseFloat(document.getElementById('discountAmount').value) || 0;
    const discountType = document.getElementById('discountType').value;
    
    let discount = 0;
    if (discountType === 'percent') {
        discount = (subtotal * discountAmount) / 100;
    } else {
        discount = discountAmount;
    }
    
    const total = subtotal - discount;
    
    document.getElementById('subtotal').textContent = `Rp ${subtotal.toLocaleString()}`;
    document.getElementById('discount').textContent = `Rp ${discount.toLocaleString()}`;
    document.getElementById('total').textContent = `Rp ${total.toLocaleString()}`;
}

function printReceipt() {
    const customerName = document.getElementById('customerName').value || 'Walk-in Customer';
    const barber = document.getElementById('barberSelect').value || 'Tidak dipilih';
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const discountAmount = parseFloat(document.getElementById('discountAmount').value) || 0;
    const discountType = document.getElementById('discountType').value;
    
    let discount = 0;
    if (discountType === 'percent') {
        discount = (subtotal * discountAmount) / 100;
    } else {
        discount = discountAmount;
    }
    
    const total = subtotal - discount;
    const currentDate = new Date().toLocaleString('id-ID');
    
    const receiptContent = document.getElementById('receiptContent');
    receiptContent.innerHTML = `
        <div class="receipt-header">
            <h3>PROGRAM BARBERSHOP</h3>
            <p>Jl. Contoh No. 123, Jakarta</p>
            <p>Telp: (021) 123-4567</p>
            <hr>
            <p><strong>Tanggal:</strong> ${currentDate}</p>
            <p><strong>Pelanggan:</strong> ${customerName}</p>
            <p><strong>Barber:</strong> ${barber}</p>
        </div>
        
        <div class="receipt-items">
            ${cart.map(item => `
                <div class="receipt-item">
                    <span>${item.name} x${item.quantity}</span>
                    <span>Rp ${(item.price * item.quantity).toLocaleString()}</span>
                </div>
            `).join('')}
        </div>
        
        <div class="receipt-total">
            <div class="receipt-item">
                <span>Subtotal:</span>
                <span>Rp ${subtotal.toLocaleString()}</span>
            </div>
            <div class="receipt-item">
                <span>Diskon:</span>
                <span>-Rp ${discount.toLocaleString()}</span>
            </div>
            <div class="receipt-item">
                <span><strong>TOTAL:</strong></span>
                <span><strong>Rp ${total.toLocaleString()}</strong></span>
            </div>
        </div>
        
        <div class="text-center mt-4">
            <p>Terima kasih atas kunjungan Anda!</p>
            <p><small>Struk ini adalah dummy untuk demo</small></p>
        </div>
    `;
    
    const receiptModal = new bootstrap.Modal(document.getElementById('receiptModal'));
    receiptModal.show();
}

function saveTransaction() {
    if (cart.length === 0) {
        alert('Keranjang kosong! Tambahkan item terlebih dahulu.');
        return;
    }
    
    const customerName = document.getElementById('customerName').value || 'Walk-in Customer';
    const barber = document.getElementById('barberSelect').value || 'Tidak dipilih';
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const discountAmount = parseFloat(document.getElementById('discountAmount').value) || 0;
    const discountType = document.getElementById('discountType').value;
    
    let discount = 0;
    if (discountType === 'percent') {
        discount = (subtotal * discountAmount) / 100;
    } else {
        discount = discountAmount;
    }
    
    const total = subtotal - discount;
    
    // Add to transactions
    const newTransaction = {
        id: transactions.length + 1,
        customer: customerName,
        barber: barber,
        total: total,
        date: new Date().toISOString().split('T')[0],
        items: [...cart]
    };
    
    transactions.push(newTransaction);
    
    // Clear cart
    cart = [];
    document.getElementById('customerName').value = '';
    document.getElementById('barberSelect').value = '';
    document.getElementById('discountAmount').value = '';
    document.getElementById('discountType').value = 'rp';
    
    updateCart();
    updateTotal();
    
    alert(`Data tersimpan [dummy]!\n\nTransaksi: ${newTransaction.id}\nPelanggan: ${customerName}\nBarber: ${barber}\nTotal: Rp ${total.toLocaleString()}`);
}

// Pelanggan Page Functions
function loadPelangganPage() {
    const customersTable = document.getElementById('customersTable');
    customersTable.innerHTML = '';
    
    customers.forEach((customer, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${customer.name}</td>
            <td>${customer.phone}</td>
            <td>${customer.barber}</td>
            <td>${customer.lastService}</td>
            <td>${customer.lastVisit}</td>
            <td>
                <button class="btn btn-info btn-sm me-1" onclick="followUpCustomer(${customer.id})">
                    <i class="fas fa-phone"></i>
                </button>
                <button class="btn btn-warning btn-sm" onclick="editCustomer(${customer.id})">
                    <i class="fas fa-edit"></i>
                </button>
            </td>
        `;
        customersTable.appendChild(row);
    });
}

function showAddCustomerModal() {
    const modal = new bootstrap.Modal(document.getElementById('addCustomerModal'));
    modal.show();
}

function addCustomer() {
    const name = document.getElementById('newCustomerName').value;
    const phone = document.getElementById('newCustomerPhone').value;
    const barber = document.getElementById('newCustomerBarber').value;
    const service = document.getElementById('newCustomerService').value;
    
    if (!name || !phone) {
        alert('Nama dan nomor telepon harus diisi!');
        return;
    }
    
    const newCustomer = {
        id: customers.length + 1,
        name: name,
        phone: phone,
        barber: barber,
        lastService: service,
        lastVisit: new Date().toISOString().split('T')[0],
        visits: 1
    };
    
    customers.push(newCustomer);
    
    // Update loyalty data
    loyaltyData.push({
        ...newCustomer,
        points: 10,
        status: 'Regular'
    });
    
    // Clear form
    document.getElementById('addCustomerForm').reset();
    
    // Close modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('addCustomerModal'));
    modal.hide();
    
    // Reload table
    loadPelangganPage();
    
    alert('Pelanggan berhasil ditambahkan!');
}

function followUpCustomer(customerId) {
    const customer = customers.find(c => c.id === customerId);
    if (!customer) return;
    
    const message = `Halo ${customer.name}, sudah waktunya potong rambut lagi. Yuk booking sekarang biar makin rapi!`;
    
    document.getElementById('followupMessage').innerHTML = `
        <p><strong>Kepada:</strong> ${customer.name} (${customer.phone})</p>
        <p><strong>Pesan:</strong></p>
        <p class="mb-0">${message}</p>
    `;
    
    // Store customer data for WhatsApp
    window.currentFollowupCustomer = customer;
    
    const modal = new bootstrap.Modal(document.getElementById('followupModal'));
    modal.show();
}

function openWhatsApp() {
    const customer = window.currentFollowupCustomer;
    if (!customer) return;
    
    const message = `Halo ${customer.name}, sudah waktunya potong rambut lagi. Yuk booking sekarang biar makin rapi!`;
    const whatsappUrl = `https://wa.me/${customer.phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
}

function editCustomer(customerId) {
    const customer = customers.find(c => c.id === customerId);
    if (!customer) return;
    
    const newName = prompt('Nama baru:', customer.name);
    if (newName && newName !== customer.name) {
        customer.name = newName;
        loadPelangganPage();
        alert('Data pelanggan berhasil diupdate!');
    }
}

// Laporan Page Functions
function loadLaporanPage() {
    loadCharts();
    updateSummary();
}

function loadCharts() {
    // Wait for Chart.js to load
    if (typeof Chart === 'undefined') {
        setTimeout(loadCharts, 100);
        return;
    }
    
    // Revenue Chart
    const revenueCtx = document.getElementById('revenueChart').getContext('2d');
    new Chart(revenueCtx, {
        type: 'line',
        data: {
            labels: ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'],
            datasets: [{
                label: 'Omzet Harian (Rp)',
                data: [450000, 520000, 380000, 610000, 750000, 890000, 420000],
                borderColor: '#3498db',
                backgroundColor: 'rgba(52, 152, 219, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Omzet Harian'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return 'Rp ' + value.toLocaleString();
                        }
                    }
                }
            }
        }
    });
    
    // Barber Chart
    const barberCtx = document.getElementById('barberChart').getContext('2d');
    new Chart(barberCtx, {
        type: 'doughnut',
        data: {
            labels: ['Budi', 'Andi', 'Rian'],
            datasets: [{
                data: [12, 8, 15],
                backgroundColor: ['#e74c3c', '#f39c12', '#27ae60'],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Pelanggan per Barber'
                },
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
    
    // Product Chart
    const productCtx = document.getElementById('productChart').getContext('2d');
    new Chart(productCtx, {
        type: 'bar',
        data: {
            labels: ['Pomade', 'Shampoo', 'Hair Gel', 'Hair Spray', 'Conditioner', 'Hair Oil'],
            datasets: [{
                label: 'Produk Terjual',
                data: [8, 12, 6, 9, 7, 4],
                backgroundColor: 'rgba(52, 152, 219, 0.8)',
                borderColor: '#3498db',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Produk Terlaris'
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function updateSummary() {
    const today = new Date().toISOString().split('T')[0];
    const todayTransactions = transactions.filter(t => t.date === today);
    
    // Calculate actual data from transactions
    const totalRevenue = todayTransactions.reduce((sum, t) => sum + t.total, 0);
    const newCustomersToday = customers.filter(c => c.lastVisit === today).length;
    
    // Count products sold today
    let productsSoldToday = 0;
    todayTransactions.forEach(transaction => {
        if (transaction.items) {
            productsSoldToday += transaction.items.filter(item => 
                products.some(p => p.name === item)
            ).length;
        }
    });
    
    document.getElementById('todayTransactions').textContent = todayTransactions.length;
    document.getElementById('todayRevenue').textContent = 'Rp ' + totalRevenue.toLocaleString();
    document.getElementById('newCustomers').textContent = newCustomersToday;
    document.getElementById('productsSold').textContent = productsSoldToday;
}

// Loyalty Page Functions
function loadLoyaltyPage() {
    loadLoyaltyTable();
    loadPromoCustomers();
}

function loadLoyaltyTable() {
    const loyaltyTable = document.getElementById('loyaltyTable');
    loyaltyTable.innerHTML = '';
    
    loyaltyData.forEach((customer, index) => {
        const row = document.createElement('tr');
        const statusBadge = customer.status === 'VIP' ? 'badge-loyalty' : 
                           customer.status === 'Loyalty' ? 'badge-vip' : 'badge-regular';
        
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${customer.name}</td>
            <td>${customer.visits}</td>
            <td>${customer.points}</td>
            <td><span class="badge ${statusBadge}">${customer.status}</span></td>
            <td>
                <button class="btn btn-success btn-sm" onclick="sendLoyaltyPromo(${customer.id})">
                    <i class="fas fa-gift"></i>
                </button>
            </td>
        `;
        loyaltyTable.appendChild(row);
    });
}

function loadPromoCustomers() {
    const promoSelect = document.getElementById('promoCustomer');
    promoSelect.innerHTML = '<option value="">Pilih Pelanggan</option>';
    
    loyaltyData.forEach(customer => {
        const option = document.createElement('option');
        option.value = customer.id;
        option.textContent = `${customer.name} (${customer.status})`;
        promoSelect.appendChild(option);
    });
}

function sendPromo() {
    const customerId = document.getElementById('promoCustomer').value;
    const promoType = document.getElementById('promoType').value;
    
    if (!customerId) {
        alert('Pilih pelanggan terlebih dahulu!');
        return;
    }
    
    const customer = loyaltyData.find(c => c.id == customerId);
    if (!customer) return;
    
    let message = '';
    switch(promoType) {
        case 'birthday':
            message = `Selamat ulang tahun, ${customer.name}! Potong rambut hari ini GRATIS creambath.`;
            break;
        case 'loyalty':
            message = `Terima kasih ${customer.name}! Sebagai pelanggan setia, dapatkan diskon 20% untuk layanan apapun.`;
            break;
        case 'seasonal':
            message = `Halo ${customer.name}! Promo musim ini: Potong + Styling hanya Rp 40.000. Buruan booking!`;
            break;
    }
    
    document.getElementById('promoMessage').innerHTML = `
        <p><strong>Kepada:</strong> ${customer.name} (${customer.phone})</p>
        <p><strong>Jenis Promo:</strong> ${promoType.charAt(0).toUpperCase() + promoType.slice(1)}</p>
        <p><strong>Pesan:</strong></p>
        <p class="mb-0">${message}</p>
    `;
    
    // Store customer data for WhatsApp
    window.currentPromoCustomer = customer;
    
    const modal = new bootstrap.Modal(document.getElementById('promoModal'));
    modal.show();
}

function openWhatsAppPromo() {
    const customer = window.currentPromoCustomer;
    if (!customer) return;
    
    const promoType = document.getElementById('promoType').value;
    let message = '';
    switch(promoType) {
        case 'birthday':
            message = `Selamat ulang tahun, ${customer.name}! Potong rambut hari ini GRATIS creambath.`;
            break;
        case 'loyalty':
            message = `Terima kasih ${customer.name}! Sebagai pelanggan setia, dapatkan diskon 20% untuk layanan apapun.`;
            break;
        case 'seasonal':
            message = `Halo ${customer.name}! Promo musim ini: Potong + Styling hanya Rp 40.000. Buruan booking!`;
            break;
    }
    
    const whatsappUrl = `https://wa.me/${customer.phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

function sendLoyaltyPromo(customerId) {
    const customer = loyaltyData.find(c => c.id == customerId);
    if (!customer) return;
    
    let message = '';
    if (customer.status === 'VIP') {
        message = `Halo ${customer.name}! Sebagai member VIP, Anda mendapat layanan gratis hari ini. Silakan datang!`;
    } else if (customer.status === 'Loyalty') {
        message = `Halo ${customer.name}! Anda sudah ${customer.visits}x berkunjung. Dapatkan diskon 15% untuk kunjungan berikutnya!`;
    } else {
        message = `Halo ${customer.name}! Kunjungan ke-${customer.visits + 1} Anda akan mendapat bonus poin ekstra!`;
    }
    
    document.getElementById('promoMessage').innerHTML = `
        <p><strong>Kepada:</strong> ${customer.name} (${customer.phone})</p>
        <p><strong>Jenis Promo:</strong> Loyalty Reward</p>
        <p><strong>Pesan:</strong></p>
        <p class="mb-0">${message}</p>
    `;
    
    // Store customer data for WhatsApp
    window.currentPromoCustomer = customer;
    
    const modal = new bootstrap.Modal(document.getElementById('promoModal'));
    modal.show();
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    initializeDummyData();
    loadKasirPage();
    
    // Add event listeners for discount calculation
    const discountAmount = document.getElementById('discountAmount');
    const discountType = document.getElementById('discountType');
    
    if (discountAmount) {
        discountAmount.addEventListener('input', updateTotal);
    }
    if (discountType) {
        discountType.addEventListener('change', updateTotal);
    }
    
    // Add click event listeners to all nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            // Extract page name from onclick attribute
            const onclickAttr = this.getAttribute('onclick');
            if (onclickAttr) {
                const match = onclickAttr.match(/showPage\('([^']+)'\)/);
                if (match) {
                    showPage(match[1]);
                }
            }
        });
    });
    
    // Initialize charts after a short delay to ensure Chart.js is loaded
    setTimeout(() => {
        if (typeof Chart !== 'undefined') {
            console.log('Chart.js loaded successfully');
        } else {
            console.log('Chart.js not loaded, retrying...');
        }
    }, 500);
});

// Utility Functions
function formatCurrency(amount) {
    return 'Rp ' + amount.toLocaleString('id-ID');
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID');
}

// Responsive handling
window.addEventListener('resize', function() {
    if (window.innerWidth <= 768) {
        // Mobile view adjustments
        document.body.classList.add('mobile-view');
    } else {
        // Desktop view adjustments
        document.body.classList.remove('mobile-view');
    }
});

// Initialize on load
window.addEventListener('load', function() {
    if (window.innerWidth <= 768) {
        document.body.classList.add('mobile-view');
    }
});
