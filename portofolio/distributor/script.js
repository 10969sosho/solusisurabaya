// Data Management
let data = {
    produk: JSON.parse(localStorage.getItem('produk')) || [],
    supplier: JSON.parse(localStorage.getItem('supplier')) || [],
    customer: JSON.parse(localStorage.getItem('customer')) || [],
    penjualan: JSON.parse(localStorage.getItem('penjualan')) || [],
    pembelian: JSON.parse(localStorage.getItem('pembelian')) || []
};

// Save data to localStorage
function saveData() {
    localStorage.setItem('produk', JSON.stringify(data.produk));
    localStorage.setItem('supplier', JSON.stringify(data.supplier));
    localStorage.setItem('customer', JSON.stringify(data.customer));
    localStorage.setItem('penjualan', JSON.stringify(data.penjualan));
    localStorage.setItem('pembelian', JSON.stringify(data.pembelian));
}

// Generate unique ID
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Update stock based on dummy data
function updateStockFromDummyData() {
    // Reset stock to initial values
    data.produk.forEach(produk => {
        // Calculate total pembelian for this product
        const totalPembelian = data.pembelian
            .filter(p => p.produkId === produk.id)
            .reduce((sum, p) => sum + p.qty, 0);
        
        // Calculate total penjualan for this product
        const totalPenjualan = data.penjualan
            .filter(p => p.produkId === produk.id)
            .reduce((sum, p) => sum + p.qty, 0);
        
        // Update stock: initial stock + pembelian - penjualan
        produk.stok = produk.stok + totalPembelian - totalPenjualan;
    });
}

// Navigation
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const modules = document.querySelectorAll('.module');
    const pageTitle = document.getElementById('page-title');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const module = link.getAttribute('data-module');
            
            // Update active nav
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            // Update active module
            modules.forEach(m => m.classList.remove('active'));
            document.getElementById(`${module}-module`).classList.add('active');
            
            // Update page title
            const titles = {
                'produk': 'Master Data - Produk',
                'supplier': 'Master Data - Supplier',
                'customer': 'Master Data - Customer',
                'pembelian': 'Transaksi - Pembelian',
                'penjualan': 'Transaksi - Penjualan',
                'stock': 'Laporan - Manajemen Stok',
                'finance': 'Laporan - Finance',
                'laporan': 'Laporan - Analisis'
            };
            pageTitle.textContent = titles[module];
            
            // Load module data
            loadModuleData(module);
        });
    });
}

// Load module data
function loadModuleData(module) {
    switch(module) {
        case 'produk':
            loadProdukTable();
            break;
        case 'supplier':
            loadSupplierTable();
            break;
        case 'customer':
            loadCustomerTable();
            break;
        case 'pembelian':
            loadPembelianTable();
            break;
        case 'penjualan':
            loadPenjualanTable();
            break;
        case 'stock':
            loadStockTable();
            break;
        case 'finance':
            loadFinanceData();
            break;
        case 'laporan':
            loadLaporanData();
            break;
    }
}

// Modal functions
function showModal(title, content) {
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modal-body');
    
    modalBody.innerHTML = `
        <div class="form-container">
            <h2>${title}</h2>
            ${content}
        </div>
    `;
    
    modal.style.display = 'block';
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('modal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

// PRODUK MODULE
function showProdukForm(produk = null) {
    const isEdit = produk !== null;
    const form = `
        <form id="produk-form">
            <div class="form-group">
                <label for="kode">Kode Produk:</label>
                <input type="text" id="kode" name="kode" value="${produk ? produk.kode : ''}" required>
            </div>
            <div class="form-group">
                <label for="nama">Nama Produk:</label>
                <input type="text" id="nama" name="nama" value="${produk ? produk.nama : ''}" required>
            </div>
            <div class="form-group">
                <label for="stok">Stok:</label>
                <input type="number" id="stok" name="stok" value="${produk ? produk.stok : ''}" min="0" required>
            </div>
            <div class="form-group">
                <label for="harga">Harga:</label>
                <input type="number" id="harga" name="harga" value="${produk ? produk.harga : ''}" min="0" required>
            </div>
            <div class="form-actions">
                <button type="button" class="btn btn-warning" onclick="closeModal()">Batal</button>
                <button type="submit" class="btn btn-success">${isEdit ? 'Update' : 'Simpan'}</button>
            </div>
        </form>
    `;
    
    showModal(isEdit ? 'Edit Produk' : 'Tambah Produk', form);
    
    document.getElementById('produk-form').addEventListener('submit', (e) => {
        e.preventDefault();
        saveProduk(produk);
    });
}

function saveProduk(produk = null) {
    const form = document.getElementById('produk-form');
    const formData = new FormData(form);
    
    const produkData = {
        id: produk ? produk.id : generateId(),
        kode: formData.get('kode'),
        nama: formData.get('nama'),
        stok: parseInt(formData.get('stok')),
        harga: parseInt(formData.get('harga'))
    };
    
    if (produk) {
        // Update existing
        const index = data.produk.findIndex(p => p.id === produk.id);
        data.produk[index] = produkData;
    } else {
        // Add new
        data.produk.push(produkData);
    }
    
    saveData();
    loadProdukTable();
    closeModal();
}

function editProduk(id) {
    const produk = data.produk.find(p => p.id === id);
    showProdukForm(produk);
}

function deleteProduk(id) {
    if (confirm('Yakin ingin menghapus produk ini?')) {
        data.produk = data.produk.filter(p => p.id !== id);
        saveData();
        loadProdukTable();
    }
}

function loadProdukTable() {
    const tbody = document.getElementById('produk-table-body');
    tbody.innerHTML = '';
    
    data.produk.forEach(produk => {
        const row = `
            <tr>
                <td>${produk.kode}</td>
                <td>${produk.nama}</td>
                <td>${produk.stok}</td>
                <td>Rp ${produk.harga.toLocaleString()}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editProduk('${produk.id}')">Edit</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteProduk('${produk.id}')">Hapus</button>
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

// SUPPLIER MODULE
function showSupplierForm(supplier = null) {
    const isEdit = supplier !== null;
    const form = `
        <form id="supplier-form">
            <div class="form-group">
                <label for="nama">Nama Supplier:</label>
                <input type="text" id="nama" name="nama" value="${supplier ? supplier.nama : ''}" required>
            </div>
            <div class="form-group">
                <label for="kontak">Kontak:</label>
                <input type="text" id="kontak" name="kontak" value="${supplier ? supplier.kontak : ''}" required>
            </div>
            <div class="form-group">
                <label for="alamat">Alamat:</label>
                <textarea id="alamat" name="alamat" rows="3" required>${supplier ? supplier.alamat : ''}</textarea>
            </div>
            <div class="form-actions">
                <button type="button" class="btn btn-warning" onclick="closeModal()">Batal</button>
                <button type="submit" class="btn btn-success">${isEdit ? 'Update' : 'Simpan'}</button>
            </div>
        </form>
    `;
    
    showModal(isEdit ? 'Edit Supplier' : 'Tambah Supplier', form);
    
    document.getElementById('supplier-form').addEventListener('submit', (e) => {
        e.preventDefault();
        saveSupplier(supplier);
    });
}

function saveSupplier(supplier = null) {
    const form = document.getElementById('supplier-form');
    const formData = new FormData(form);
    
    const supplierData = {
        id: supplier ? supplier.id : generateId(),
        nama: formData.get('nama'),
        kontak: formData.get('kontak'),
        alamat: formData.get('alamat')
    };
    
    if (supplier) {
        const index = data.supplier.findIndex(s => s.id === supplier.id);
        data.supplier[index] = supplierData;
    } else {
        data.supplier.push(supplierData);
    }
    
    saveData();
    loadSupplierTable();
    closeModal();
}

function editSupplier(id) {
    const supplier = data.supplier.find(s => s.id === id);
    showSupplierForm(supplier);
}

function deleteSupplier(id) {
    if (confirm('Yakin ingin menghapus supplier ini?')) {
        data.supplier = data.supplier.filter(s => s.id !== id);
        saveData();
        loadSupplierTable();
    }
}

function loadSupplierTable() {
    const tbody = document.getElementById('supplier-table-body');
    tbody.innerHTML = '';
    
    data.supplier.forEach(supplier => {
        const row = `
            <tr>
                <td>${supplier.nama}</td>
                <td>${supplier.kontak}</td>
                <td>${supplier.alamat}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editSupplier('${supplier.id}')">Edit</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteSupplier('${supplier.id}')">Hapus</button>
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

// CUSTOMER MODULE
function showCustomerForm(customer = null) {
    const isEdit = customer !== null;
    const form = `
        <form id="customer-form">
            <div class="form-group">
                <label for="nama">Nama Customer:</label>
                <input type="text" id="nama" name="nama" value="${customer ? customer.nama : ''}" required>
            </div>
            <div class="form-group">
                <label for="kontak">Kontak:</label>
                <input type="text" id="kontak" name="kontak" value="${customer ? customer.kontak : ''}" required>
            </div>
            <div class="form-group">
                <label for="alamat">Alamat:</label>
                <textarea id="alamat" name="alamat" rows="3" required>${customer ? customer.alamat : ''}</textarea>
            </div>
            <div class="form-actions">
                <button type="button" class="btn btn-warning" onclick="closeModal()">Batal</button>
                <button type="submit" class="btn btn-success">${isEdit ? 'Update' : 'Simpan'}</button>
            </div>
        </form>
    `;
    
    showModal(isEdit ? 'Edit Customer' : 'Tambah Customer', form);
    
    document.getElementById('customer-form').addEventListener('submit', (e) => {
        e.preventDefault();
        saveCustomer(customer);
    });
}

function saveCustomer(customer = null) {
    const form = document.getElementById('customer-form');
    const formData = new FormData(form);
    
    const customerData = {
        id: customer ? customer.id : generateId(),
        nama: formData.get('nama'),
        kontak: formData.get('kontak'),
        alamat: formData.get('alamat')
    };
    
    if (customer) {
        const index = data.customer.findIndex(c => c.id === customer.id);
        data.customer[index] = customerData;
    } else {
        data.customer.push(customerData);
    }
    
    saveData();
    loadCustomerTable();
    closeModal();
}

function editCustomer(id) {
    const customer = data.customer.find(c => c.id === id);
    showCustomerForm(customer);
}

function deleteCustomer(id) {
    if (confirm('Yakin ingin menghapus customer ini?')) {
        data.customer = data.customer.filter(c => c.id !== id);
        saveData();
        loadCustomerTable();
    }
}

function loadCustomerTable() {
    const tbody = document.getElementById('customer-table-body');
    tbody.innerHTML = '';
    
    data.customer.forEach(customer => {
        const row = `
            <tr>
                <td>${customer.nama}</td>
                <td>${customer.kontak}</td>
                <td>${customer.alamat}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editCustomer('${customer.id}')">Edit</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteCustomer('${customer.id}')">Hapus</button>
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

// PENJUALAN MODULE
function showPenjualanForm(penjualan = null) {
    const isEdit = penjualan !== null;
    const customerOptions = data.customer.map(c => 
        `<option value="${c.id}" ${penjualan && penjualan.customerId === c.id ? 'selected' : ''}>${c.nama}</option>`
    ).join('');
    
    const produkOptions = data.produk.map(p => 
        `<option value="${p.id}" ${penjualan && penjualan.produkId === p.id ? 'selected' : ''}>${p.nama} (Stok: ${p.stok})</option>`
    ).join('');
    
    const form = `
        <form id="penjualan-form">
            <div class="form-group">
                <label for="customerId">Customer:</label>
                <select id="customerId" name="customerId" required>
                    <option value="">Pilih Customer</option>
                    ${customerOptions}
                </select>
            </div>
            <div class="form-group">
                <label for="produkId">Produk:</label>
                <select id="produkId" name="produkId" required onchange="updateHarga()">
                    <option value="">Pilih Produk</option>
                    ${produkOptions}
                </select>
            </div>
            <div class="form-group">
                <label for="qty">Quantity:</label>
                <input type="number" id="qty" name="qty" value="${penjualan ? penjualan.qty : ''}" min="1" required onchange="updateTotal()">
            </div>
            <div class="form-group">
                <label for="harga">Harga per Unit:</label>
                <input type="number" id="harga" name="harga" readonly>
            </div>
            <div class="form-group">
                <label for="total">Total Harga:</label>
                <input type="number" id="total" name="total" readonly>
            </div>
            <div class="form-actions">
                <button type="button" class="btn btn-warning" onclick="closeModal()">Batal</button>
                <button type="submit" class="btn btn-success">${isEdit ? 'Update' : 'Simpan'}</button>
            </div>
        </form>
    `;
    
    showModal(isEdit ? 'Edit Penjualan' : 'Buat Order', form);
    
    if (penjualan) {
        updateHarga();
        updateTotal();
    }
    
    document.getElementById('penjualan-form').addEventListener('submit', (e) => {
        e.preventDefault();
        savePenjualan(penjualan);
    });
}

function updateHarga() {
    const produkId = document.getElementById('produkId').value;
    const hargaInput = document.getElementById('harga');
    
    if (produkId) {
        const produk = data.produk.find(p => p.id === produkId);
        if (produk) {
            hargaInput.value = produk.harga;
            updateTotal();
        }
    } else {
        hargaInput.value = '';
    }
}

function updateTotal() {
    const qty = parseInt(document.getElementById('qty').value) || 0;
    const harga = parseInt(document.getElementById('harga').value) || 0;
    const total = qty * harga;
    
    document.getElementById('total').value = total;
}

function savePenjualan(penjualan = null) {
    const form = document.getElementById('penjualan-form');
    const formData = new FormData(form);
    
    const customerId = formData.get('customerId');
    const produkId = formData.get('produkId');
    const qty = parseInt(formData.get('qty'));
    const total = parseInt(formData.get('total'));
    
    // Check stock availability
    const produk = data.produk.find(p => p.id === produkId);
    if (produk.stok < qty) {
        alert('Stok tidak mencukupi!');
        return;
    }
    
    const penjualanData = {
        id: penjualan ? penjualan.id : generateId(),
        customerId: customerId,
        produkId: produkId,
        qty: qty,
        total: total,
        tanggal: penjualan ? penjualan.tanggal : new Date().toISOString().split('T')[0]
    };
    
    if (penjualan) {
        // Update existing - restore old stock first
        const oldPenjualan = data.penjualan.find(p => p.id === penjualan.id);
        const oldProduk = data.produk.find(p => p.id === oldPenjualan.produkId);
        oldProduk.stok += oldPenjualan.qty;
        
        // Update stock for new quantity
        produk.stok -= qty;
        
        const index = data.penjualan.findIndex(p => p.id === penjualan.id);
        data.penjualan[index] = penjualanData;
    } else {
        // Add new - reduce stock
        produk.stok -= qty;
        data.penjualan.push(penjualanData);
    }
    
    saveData();
    loadPenjualanTable();
    closeModal();
}

function editPenjualan(id) {
    const penjualan = data.penjualan.find(p => p.id === id);
    showPenjualanForm(penjualan);
}

function deletePenjualan(id) {
    if (confirm('Yakin ingin menghapus penjualan ini?')) {
        const penjualan = data.penjualan.find(p => p.id === id);
        const produk = data.produk.find(p => p.id === penjualan.produkId);
        
        // Restore stock
        produk.stok += penjualan.qty;
        
        data.penjualan = data.penjualan.filter(p => p.id !== id);
        saveData();
        loadPenjualanTable();
    }
}

function loadPenjualanTable() {
    const tbody = document.getElementById('penjualan-table-body');
    tbody.innerHTML = '';
    
    data.penjualan.forEach(penjualan => {
        const customer = data.customer.find(c => c.id === penjualan.customerId);
        const produk = data.produk.find(p => p.id === penjualan.produkId);
        
        const row = `
            <tr>
                <td>${penjualan.id}</td>
                <td>${penjualan.tanggal}</td>
                <td>${customer ? customer.nama : 'N/A'}</td>
                <td>${produk ? produk.nama : 'N/A'}</td>
                <td>${penjualan.qty}</td>
                <td>Rp ${penjualan.total.toLocaleString()}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editPenjualan('${penjualan.id}')">Edit</button>
                    <button class="btn btn-danger btn-sm" onclick="deletePenjualan('${penjualan.id}')">Hapus</button>
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

// PEMBELIAN MODULE
function showPembelianForm(pembelian = null) {
    const isEdit = pembelian !== null;
    const supplierOptions = data.supplier.map(s => 
        `<option value="${s.id}" ${pembelian && pembelian.supplierId === s.id ? 'selected' : ''}>${s.nama}</option>`
    ).join('');
    
    const produkOptions = data.produk.map(p => 
        `<option value="${p.id}" ${pembelian && pembelian.produkId === p.id ? 'selected' : ''}>${p.nama}</option>`
    ).join('');
    
    const form = `
        <form id="pembelian-form">
            <div class="form-group">
                <label for="supplierId">Supplier:</label>
                <select id="supplierId" name="supplierId" required>
                    <option value="">Pilih Supplier</option>
                    ${supplierOptions}
                </select>
            </div>
            <div class="form-group">
                <label for="produkId">Produk:</label>
                <select id="produkId" name="produkId" required onchange="updateHargaBeli()">
                    <option value="">Pilih Produk</option>
                    ${produkOptions}
                </select>
            </div>
            <div class="form-group">
                <label for="qty">Quantity:</label>
                <input type="number" id="qty" name="qty" value="${pembelian ? pembelian.qty : ''}" min="1" required onchange="updateTotalBeli()">
            </div>
            <div class="form-group">
                <label for="hargaBeli">Harga Beli per Unit:</label>
                <input type="number" id="hargaBeli" name="hargaBeli" value="${pembelian ? pembelian.hargaBeli : ''}" min="0" required onchange="updateTotalBeli()">
            </div>
            <div class="form-group">
                <label for="totalBeli">Total Harga:</label>
                <input type="number" id="totalBeli" name="totalBeli" readonly>
            </div>
            <div class="form-actions">
                <button type="button" class="btn btn-warning" onclick="closeModal()">Batal</button>
                <button type="submit" class="btn btn-success">${isEdit ? 'Update' : 'Simpan'}</button>
            </div>
        </form>
    `;
    
    showModal(isEdit ? 'Edit Pembelian' : 'Buat Pembelian', form);
    
    if (pembelian) {
        updateTotalBeli();
    }
    
    document.getElementById('pembelian-form').addEventListener('submit', (e) => {
        e.preventDefault();
        savePembelian(pembelian);
    });
}

function updateHargaBeli() {
    const produkId = document.getElementById('produkId').value;
    const hargaBeliInput = document.getElementById('hargaBeli');
    
    if (produkId) {
        const produk = data.produk.find(p => p.id === produkId);
        if (produk) {
            hargaBeliInput.value = produk.harga * 0.7; // Harga beli 70% dari harga jual
            updateTotalBeli();
        }
    } else {
        hargaBeliInput.value = '';
    }
}

function updateTotalBeli() {
    const qty = parseInt(document.getElementById('qty').value) || 0;
    const hargaBeli = parseInt(document.getElementById('hargaBeli').value) || 0;
    const total = qty * hargaBeli;
    
    document.getElementById('totalBeli').value = total;
}

function savePembelian(pembelian = null) {
    const form = document.getElementById('pembelian-form');
    const formData = new FormData(form);
    
    const supplierId = formData.get('supplierId');
    const produkId = formData.get('produkId');
    const qty = parseInt(formData.get('qty'));
    const hargaBeli = parseInt(formData.get('hargaBeli'));
    const total = parseInt(formData.get('totalBeli'));
    
    const pembelianData = {
        id: pembelian ? pembelian.id : generateId(),
        supplierId: supplierId,
        produkId: produkId,
        qty: qty,
        hargaBeli: hargaBeli,
        total: total,
        tanggal: pembelian ? pembelian.tanggal : new Date().toISOString().split('T')[0]
    };
    
    if (pembelian) {
        // Update existing - restore old stock first
        const oldPembelian = data.pembelian.find(p => p.id === pembelian.id);
        const oldProduk = data.produk.find(p => p.id === oldPembelian.produkId);
        oldProduk.stok -= oldPembelian.qty;
        
        // Add new stock
        const produk = data.produk.find(p => p.id === produkId);
        produk.stok += qty;
        
        const index = data.pembelian.findIndex(p => p.id === pembelian.id);
        data.pembelian[index] = pembelianData;
    } else {
        // Add new - increase stock
        const produk = data.produk.find(p => p.id === produkId);
        produk.stok += qty;
        data.pembelian.push(pembelianData);
    }
    
    saveData();
    loadPembelianTable();
    closeModal();
}

function editPembelian(id) {
    const pembelian = data.pembelian.find(p => p.id === id);
    showPembelianForm(pembelian);
}

function deletePembelian(id) {
    if (confirm('Yakin ingin menghapus pembelian ini?')) {
        const pembelian = data.pembelian.find(p => p.id === id);
        const produk = data.produk.find(p => p.id === pembelian.produkId);
        
        // Restore stock
        produk.stok -= pembelian.qty;
        
        data.pembelian = data.pembelian.filter(p => p.id !== id);
        saveData();
        loadPembelianTable();
    }
}

function loadPembelianTable() {
    const tbody = document.getElementById('pembelian-table-body');
    tbody.innerHTML = '';
    
    data.pembelian.forEach(pembelian => {
        const supplier = data.supplier.find(s => s.id === pembelian.supplierId);
        const produk = data.produk.find(p => p.id === pembelian.produkId);
        
        const row = `
            <tr>
                <td>${pembelian.id}</td>
                <td>${pembelian.tanggal}</td>
                <td>${supplier ? supplier.nama : 'N/A'}</td>
                <td>${produk ? produk.nama : 'N/A'}</td>
                <td>${pembelian.qty}</td>
                <td>Rp ${pembelian.hargaBeli.toLocaleString()}</td>
                <td>Rp ${pembelian.total.toLocaleString()}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editPembelian('${pembelian.id}')">Edit</button>
                    <button class="btn btn-danger btn-sm" onclick="deletePembelian('${pembelian.id}')">Hapus</button>
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

// STOCK MODULE
function loadStockTable() {
    const tbody = document.getElementById('stock-table-body');
    tbody.innerHTML = '';
    
    data.produk.forEach(produk => {
        // Calculate stock movements
        const pembelianQty = data.pembelian
            .filter(p => p.produkId === produk.id)
            .reduce((sum, p) => sum + p.qty, 0);
        
        const penjualanQty = data.penjualan
            .filter(p => p.produkId === produk.id)
            .reduce((sum, p) => sum + p.qty, 0);
        
        const stokAwal = produk.stok + penjualanQty - pembelianQty;
        const stokAkhir = produk.stok;
        
        // Determine stock status
        let status = 'aman';
        let statusClass = 'aman';
        if (stokAkhir <= 5) {
            status = 'kritis';
            statusClass = 'kritis';
        } else if (stokAkhir <= 15) {
            status = 'warning';
            statusClass = 'warning';
        }
        
        const row = `
            <tr>
                <td>${produk.kode}</td>
                <td>${produk.nama}</td>
                <td>${stokAwal}</td>
                <td>${pembelianQty}</td>
                <td>${penjualanQty}</td>
                <td>${stokAkhir}</td>
                <td><span class="stock-status ${statusClass}">${status.toUpperCase()}</span></td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

// FINANCE MODULE
function loadFinanceData() {
    // Calculate totals
    const totalPenjualan = data.penjualan.reduce((sum, p) => sum + p.total, 0);
    const totalPembelian = data.pembelian.reduce((sum, p) => sum + p.total, 0);
    const labaKotor = totalPenjualan - totalPembelian;
    const marginPercent = totalPenjualan > 0 ? ((labaKotor / totalPenjualan) * 100).toFixed(1) : 0;
    
    // Update finance cards
    document.getElementById('total-penjualan-finance').textContent = `Rp ${totalPenjualan.toLocaleString()}`;
    document.getElementById('total-pembelian-finance').textContent = `Rp ${totalPembelian.toLocaleString()}`;
    document.getElementById('laba-kotor').textContent = `Rp ${labaKotor.toLocaleString()}`;
    document.getElementById('margin-percent').textContent = `${marginPercent}%`;
    
    // Load finance table
    const tbody = document.getElementById('finance-table-body');
    tbody.innerHTML = '';
    
    let saldo = 0;
    const allTransactions = [];
    
    // Add penjualan transactions
    data.penjualan.forEach(p => {
        allTransactions.push({
            tanggal: p.tanggal,
            jenis: 'Penjualan',
            deskripsi: `Penjualan ${data.produk.find(pr => pr.id === p.produkId)?.nama || 'N/A'}`,
            debit: p.total,
            kredit: 0
        });
    });
    
    // Add pembelian transactions
    data.pembelian.forEach(p => {
        allTransactions.push({
            tanggal: p.tanggal,
            jenis: 'Pembelian',
            deskripsi: `Pembelian ${data.produk.find(pr => pr.id === p.produkId)?.nama || 'N/A'}`,
            debit: 0,
            kredit: p.total
        });
    });
    
    // Sort by date
    allTransactions.sort((a, b) => new Date(a.tanggal) - new Date(b.tanggal));
    
    allTransactions.forEach(trans => {
        saldo += trans.debit - trans.kredit;
        const row = `
            <tr>
                <td>${trans.tanggal}</td>
                <td>${trans.jenis}</td>
                <td>${trans.deskripsi}</td>
                <td>${trans.debit > 0 ? 'Rp ' + trans.debit.toLocaleString() : '-'}</td>
                <td>${trans.kredit > 0 ? 'Rp ' + trans.kredit.toLocaleString() : '-'}</td>
                <td>Rp ${saldo.toLocaleString()}</td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

// LAPORAN MODULE
function loadLaporanData() {
    // Calculate total pendapatan
    const totalPendapatan = data.penjualan.reduce((sum, p) => sum + p.total, 0);
    document.getElementById('total-pendapatan').textContent = `Rp ${totalPendapatan.toLocaleString()}`;
    
    // Calculate total penjualan
    const totalPenjualan = data.penjualan.length;
    document.getElementById('total-penjualan').textContent = totalPenjualan;
    
    // Find most sold product
    const produkTerjual = {};
    data.penjualan.forEach(p => {
        if (produkTerjual[p.produkId]) {
            produkTerjual[p.produkId] += p.qty;
        } else {
            produkTerjual[p.produkId] = p.qty;
        }
    });
    
    let produkTerlaris = '-';
    let maxQty = 0;
    Object.keys(produkTerjual).forEach(produkId => {
        if (produkTerjual[produkId] > maxQty) {
            maxQty = produkTerjual[produkId];
            const produk = data.produk.find(p => p.id === produkId);
            produkTerlaris = produk ? produk.nama : 'N/A';
        }
    });
    document.getElementById('produk-terlaris').textContent = produkTerlaris;
    
    // Load laporan table
    const tbody = document.getElementById('laporan-table-body');
    tbody.innerHTML = '';
    
    data.penjualan.forEach(penjualan => {
        const customer = data.customer.find(c => c.id === penjualan.customerId);
        const produk = data.produk.find(p => p.id === penjualan.produkId);
        
        const row = `
            <tr>
                <td>${penjualan.id}</td>
                <td>${penjualan.tanggal}</td>
                <td>${customer ? customer.nama : 'N/A'}</td>
                <td>${produk ? produk.nama : 'N/A'}</td>
                <td>${penjualan.qty}</td>
                <td>Rp ${penjualan.total.toLocaleString()}</td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    loadModuleData('produk');
    
    // Add comprehensive sample data if empty
    if (data.produk.length === 0) {
        data.produk = [
            { id: '1', kode: 'PRD001', nama: 'Laptop Dell Inspiron 15', stok: 8, harga: 8000000 },
            { id: '2', kode: 'PRD002', nama: 'Mouse Wireless Logitech', stok: 35, harga: 150000 },
            { id: '3', kode: 'PRD003', nama: 'Keyboard Mechanical RGB', stok: 18, harga: 500000 },
            { id: '4', kode: 'PRD004', nama: 'Monitor 24" Full HD', stok: 12, harga: 2500000 },
            { id: '5', kode: 'PRD005', nama: 'Webcam HD 1080p', stok: 25, harga: 350000 },
            { id: '6', kode: 'PRD006', nama: 'Headset Gaming', stok: 20, harga: 750000 },
            { id: '7', kode: 'PRD007', nama: 'SSD 256GB', stok: 30, harga: 400000 },
            { id: '8', kode: 'PRD008', nama: 'RAM DDR4 8GB', stok: 40, harga: 300000 },
            { id: '9', kode: 'PRD009', nama: 'Printer Laser HP', stok: 5, harga: 1200000 },
            { id: '10', kode: 'PRD010', nama: 'Router WiFi 6', stok: 15, harga: 600000 }
        ];
    }
    
    if (data.supplier.length === 0) {
        data.supplier = [
            { id: '1', nama: 'PT Teknologi Maju', kontak: '021-1234567', alamat: 'Jl. Sudirman No. 123, Jakarta Selatan' },
            { id: '2', nama: 'CV Komputer Jaya', kontak: '021-7654321', alamat: 'Jl. Asia Afrika No. 45, Bandung' },
            { id: '3', nama: 'UD Elektronik Mandiri', kontak: '031-9876543', alamat: 'Jl. Diponegoro No. 67, Surabaya' },
            { id: '4', nama: 'PT Digital Solutions', kontak: '061-4567890', alamat: 'Jl. Gatot Subroto No. 89, Medan' },
            { id: '5', nama: 'CV Hardware Store', kontak: '0274-1234567', alamat: 'Jl. Malioboro No. 12, Yogyakarta' }
        ];
    }
    
    if (data.customer.length === 0) {
        data.customer = [
            { id: '1', nama: 'Toko ABC Computer', kontak: '08123456789', alamat: 'Jl. Pahlawan No. 10, Surabaya' },
            { id: '2', nama: 'CV Digital Solutions', kontak: '08198765432', alamat: 'Jl. Merdeka No. 25, Medan' },
            { id: '3', nama: 'Toko Elektronik XYZ', kontak: '08234567890', alamat: 'Jl. Thamrin No. 15, Jakarta' },
            { id: '4', nama: 'UD Komputer Jaya', kontak: '08345678901', alamat: 'Jl. Ahmad Yani No. 30, Bandung' },
            { id: '5', nama: 'Toko IT Center', kontak: '08456789012', alamat: 'Jl. Diponegoro No. 8, Semarang' },
            { id: '6', nama: 'CV Teknologi Mandiri', kontak: '08567890123', alamat: 'Jl. Gatot Subroto No. 20, Makassar' },
            { id: '7', nama: 'Toko Hardware Plus', kontak: '08678901234', alamat: 'Jl. Sudirman No. 5, Palembang' },
            { id: '8', nama: 'UD Elektronik 88', kontak: '08789012345', alamat: 'Jl. Asia Afrika No. 12, Bandung' }
        ];
    }
    
    if (data.pembelian.length === 0) {
        data.pembelian = [
            { id: '1', supplierId: '1', produkId: '1', qty: 5, hargaBeli: 5600000, total: 28000000, tanggal: '2024-01-15' },
            { id: '2', supplierId: '2', produkId: '2', qty: 20, hargaBeli: 105000, total: 2100000, tanggal: '2024-01-16' },
            { id: '3', supplierId: '1', produkId: '3', qty: 15, hargaBeli: 350000, total: 5250000, tanggal: '2024-01-18' },
            { id: '4', supplierId: '3', produkId: '4', qty: 8, hargaBeli: 1750000, total: 14000000, tanggal: '2024-01-20' },
            { id: '5', supplierId: '2', produkId: '5', qty: 25, hargaBeli: 245000, total: 6125000, tanggal: '2024-01-22' },
            { id: '6', supplierId: '4', produkId: '6', qty: 12, hargaBeli: 525000, total: 6300000, tanggal: '2024-01-25' },
            { id: '7', supplierId: '1', produkId: '7', qty: 30, hargaBeli: 280000, total: 8400000, tanggal: '2024-01-28' },
            { id: '8', supplierId: '3', produkId: '8', qty: 35, hargaBeli: 210000, total: 7350000, tanggal: '2024-02-01' },
            { id: '9', supplierId: '5', produkId: '9', qty: 3, hargaBeli: 840000, total: 2520000, tanggal: '2024-02-03' },
            { id: '10', supplierId: '2', produkId: '10', qty: 10, hargaBeli: 420000, total: 4200000, tanggal: '2024-02-05' },
            { id: '11', supplierId: '3', produkId: '1', qty: 3, hargaBeli: 5600000, total: 16800000, tanggal: '2024-02-08' },
            { id: '12', supplierId: '4', produkId: '2', qty: 15, hargaBeli: 105000, total: 1575000, tanggal: '2024-02-10' },
            { id: '13', supplierId: '5', produkId: '3', qty: 8, hargaBeli: 350000, total: 2800000, tanggal: '2024-02-12' },
            { id: '14', supplierId: '1', produkId: '4', qty: 4, hargaBeli: 1750000, total: 7000000, tanggal: '2024-02-14' }
        ];
    }
    
    if (data.penjualan.length === 0) {
        data.penjualan = [
            { id: '1', customerId: '1', produkId: '1', qty: 2, total: 16000000, tanggal: '2024-01-20' },
            { id: '2', customerId: '2', produkId: '2', qty: 5, total: 750000, tanggal: '2024-01-21' },
            { id: '3', customerId: '3', produkId: '3', qty: 3, total: 1500000, tanggal: '2024-01-22' },
            { id: '4', customerId: '4', produkId: '4', qty: 1, total: 2500000, tanggal: '2024-01-23' },
            { id: '5', customerId: '5', produkId: '5', qty: 4, total: 1400000, tanggal: '2024-01-24' },
            { id: '6', customerId: '6', produkId: '6', qty: 2, total: 1500000, tanggal: '2024-01-25' },
            { id: '7', customerId: '7', produkId: '7', qty: 6, total: 2400000, tanggal: '2024-01-26' },
            { id: '8', customerId: '8', produkId: '8', qty: 8, total: 2400000, tanggal: '2024-01-27' },
            { id: '9', customerId: '1', produkId: '9', qty: 1, total: 1200000, tanggal: '2024-01-28' },
            { id: '10', customerId: '2', produkId: '10', qty: 3, total: 1800000, tanggal: '2024-01-29' },
            { id: '11', customerId: '3', produkId: '1', qty: 1, total: 8000000, tanggal: '2024-01-30' },
            { id: '12', customerId: '4', produkId: '2', qty: 10, total: 1500000, tanggal: '2024-02-01' },
            { id: '13', customerId: '5', produkId: '3', qty: 2, total: 1000000, tanggal: '2024-02-02' },
            { id: '14', customerId: '6', produkId: '4', qty: 2, total: 5000000, tanggal: '2024-02-03' },
            { id: '15', customerId: '7', produkId: '5', qty: 5, total: 1750000, tanggal: '2024-02-04' },
            { id: '16', customerId: '8', produkId: '6', qty: 3, total: 2250000, tanggal: '2024-02-05' },
            { id: '17', customerId: '1', produkId: '7', qty: 4, total: 1600000, tanggal: '2024-02-06' },
            { id: '18', customerId: '2', produkId: '8', qty: 6, total: 1800000, tanggal: '2024-02-07' },
            { id: '19', customerId: '3', produkId: '9', qty: 1, total: 1200000, tanggal: '2024-02-08' },
            { id: '20', customerId: '4', produkId: '10', qty: 2, total: 1200000, tanggal: '2024-02-09' },
            { id: '21', customerId: '5', produkId: '1', qty: 1, total: 8000000, tanggal: '2024-02-10' },
            { id: '22', customerId: '6', produkId: '2', qty: 8, total: 1200000, tanggal: '2024-02-11' },
            { id: '23', customerId: '7', produkId: '3', qty: 4, total: 2000000, tanggal: '2024-02-12' },
            { id: '24', customerId: '8', produkId: '4', qty: 1, total: 2500000, tanggal: '2024-02-13' },
            { id: '25', customerId: '1', produkId: '5', qty: 6, total: 2100000, tanggal: '2024-02-14' }
        ];
    }
    
    // Update stock based on dummy data
    updateStockFromDummyData();
    
    saveData();
    loadModuleData('produk');
});
