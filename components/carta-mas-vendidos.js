// ===================================
// CARRUSEL DE LIBROS REUTILIZABLE
// ===================================
class BookCarousel {
    constructor(container, books) {
        this.container = container;
        this.books = books;
        this.currentSlide = 0;
        this.booksPerSlide = this.getBooksPerSlide();
        this.totalSlides = Math.ceil(this.books.length / this.booksPerSlide);
        this.carouselId = container.dataset.carouselId;
        
        this.init();
        this.setupEventListeners();
        this.setupResponsive();
    }

    getBooksPerSlide() {
        if (window.innerWidth >= 1024) return 4;
        if (window.innerWidth >= 768) return 3;
        if (window.innerWidth >= 640) return 2;
        return 1;
    }

    init() {
        this.render();
        this.updateIndicators();
    }

    render() {
        const slides = this.createSlides();
        const indicators = this.createIndicators();
        const controls = this.createControls();

        this.container.innerHTML = `
            <div class="relative w-full rounded-xl shadow-lg overflow-hidden">
                <div class="carousel-wrapper relative h-auto overflow-hidden" id="wrapper-${this.carouselId}">
                    ${slides}
                </div>
                
                ${this.totalSlides > 1 ? `
                    <div class="absolute z-30 flex -translate-x-1/2 bottom-4 left-1/2 space-x-2">
                        ${indicators}
                    </div>
                ` : ''}
                
                ${this.totalSlides > 1 ? controls : ''}
            </div>
        `;
    }

    createSlides() {
        let slides = '';
        
        for (let i = 0; i < this.totalSlides; i++) {
            const startIndex = i * this.booksPerSlide;
            const endIndex = Math.min(startIndex + this.booksPerSlide, this.books.length);
            const slideBooks = this.books.slice(startIndex, endIndex);
            
            const isActive = i === this.currentSlide;
            
            slides += `
                <div class="carousel-slide ${isActive ? 'active' : 'hidden'} duration-700 ease-in-out" data-slide="${i}">
                    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-8">
                        ${slideBooks.map(book => this.createBookCard(book)).join('')}
                    </div>
                </div>
            `;
        }
        
        return slides;
    }

    createBookCard(book) {
        return `
            <div class="book-card bg-orange-100 border border-amber-100 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
                <div class="relative overflow-hidden rounded-t-lg">
                    <img class="w-full h-48 object-cover hover:scale-105 transition-transform duration-300" 
                         src="${book.image}" 
                         alt="${book.title}"
                         onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjI0MCIgdmlld0JveD0iMCAwIDIwMCAyNDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjQwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik02MCA5MEgxNDBWMTUwSDYwVjkwWiIgZmlsbD0iIzlDQTNBRiIvPgo8dGV4dCB4PSIxMDAiIHk9IjEzMCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE0IiBmaWxsPSIjNkI3MjgwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5MaWJybzwvdGV4dD4KPC9zdmc+'" />
                </div>
                <div class="p-5 flex flex-col flex-grow">
                    <h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900 line-clamp-2">${book.title}</h5>
                    <p class="mb-4 text-sm text-zinc-700 flex-grow line-clamp-3">${book.description}</p>
                    <div class="mt-auto space-y-2">
                        ${book.price ? `<p class="text-lg font-bold text-green-600">${book.price}</p>` : ''}
                        <div class="flex gap-2">
                            <button onclick="openBookDetails(${JSON.stringify(book).replace(/"/g, '&quot;')})" 
                                    class="flex-1 px-3 py-2 text-sm font-medium text-center text-blue-700 border border-blue-700 rounded-lg hover:bg-blue-700 hover:text-white transition-colors duration-200">
                                Ver Detalles
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    createIndicators() {
        let indicators = '';
        for (let i = 0; i < this.totalSlides; i++) {
            const isActive = i === this.currentSlide;
            indicators += `
                <button type="button" 
                        class="indicator w-3 h-3 rounded-full transition-colors duration-200 ${isActive ? 'bg-blue-600' : 'bg-gray-300 hover:bg-gray-400'}" 
                        data-slide-to="${i}" 
                        aria-label="Slide ${i + 1}">
                </button>
            `;
        }
        return indicators;
    }

    createControls() {
        return `
            <button type="button" 
                    class="carousel-prev absolute top-1/2 left-4 z-30 -translate-y-1/2 flex items-center justify-center group">
                <span class="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/80 hover:bg-white shadow-lg transition-all duration-200 hover:scale-110">
                    <svg class="w-5 h-5 text-gray-800" fill="none" viewBox="0 0 6 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4" />
                    </svg>
                </span>
            </button>
            
            <button type="button" 
                    class="carousel-next absolute top-1/2 right-4 z-30 -translate-y-1/2 flex items-center justify-center group">
                <span class="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/80 hover:bg-white shadow-lg transition-all duration-200 hover:scale-110">
                    <svg class="w-5 h-5 text-gray-800" fill="none" viewBox="0 0 6 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
                    </svg>
                </span>
            </button>
        `;
    }

    setupEventListeners() {
        this.container.querySelectorAll('.indicator').forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.goToSlide(index));
        });

        const prevBtn = this.container.querySelector('.carousel-prev');
        const nextBtn = this.container.querySelector('.carousel-next');
        
        if (prevBtn) prevBtn.addEventListener('click', () => this.prevSlide());
        if (nextBtn) nextBtn.addEventListener('click', () => this.nextSlide());
    }

    setupResponsive() {
        window.addEventListener('resize', () => {
            const newBooksPerSlide = this.getBooksPerSlide();
            if (newBooksPerSlide !== this.booksPerSlide) {
                this.booksPerSlide = newBooksPerSlide;
                this.totalSlides = Math.ceil(this.books.length / this.booksPerSlide);
                this.currentSlide = 0;
                this.render();
                this.setupEventListeners();
            }
        });
    }

    goToSlide(slideIndex) {
        if (slideIndex >= 0 && slideIndex < this.totalSlides) {
            this.currentSlide = slideIndex;
            this.updateSlides();
            this.updateIndicators();
        }
    }

    nextSlide() {
        const nextIndex = (this.currentSlide + 1) % this.totalSlides;
        this.goToSlide(nextIndex);
    }

    prevSlide() {
        const prevIndex = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
        this.goToSlide(prevIndex);
    }

    updateSlides() {
        const slides = this.container.querySelectorAll('.carousel-slide');
        slides.forEach((slide, index) => {
            if (index === this.currentSlide) {
                slide.classList.remove('hidden');
                slide.classList.add('active');
            } else {
                slide.classList.add('hidden');
                slide.classList.remove('active');
            }
        });
    }

    updateIndicators() {
        const indicators = this.container.querySelectorAll('.indicator');
        indicators.forEach((indicator, index) => {
            if (index === this.currentSlide) {
                indicator.classList.remove('bg-gray-300', 'hover:bg-gray-400');
                indicator.classList.add('bg-blue-600');
            } else {
                indicator.classList.remove('bg-blue-600');
                indicator.classList.add('bg-gray-300', 'hover:bg-gray-400');
            }
        });
    }
}

// ===================================
// DATOS DE LIBROS
// ===================================
const booksData = {
  masvendidos: [
    {
      id: "hp1",
      title: "Harry Potter y la Piedra Filosofal",
      description: "El inicio de la saga mágica más famosa del mundo. Acompaña a Harry en su primera aventura en Hogwarts.",
      image: "../assets/images/libros/harry-potter-piedra.jfif",
      price: "COP 79,900",
      category: "Fantasía"
    },
    {
      id: "hobbit",
      title: "El Hobbit",
      description: "La extraordinaria aventura de Bilbo Bolsón que cambió para siempre la Tierra Media.",
      image: "../assets/images/libros/el-hobbit.jfif",
      price: "COP 63,900",
      category: "Fantasía"
    },
    {
      id: "cien-anos",
      title: "Cien Años de Soledad",
      description: "La obra maestra de Gabriel García Márquez que define el realismo mágico.",
      image: "../assets/images/libros/cien-anos-de-soledad.jfif",
      price: "COP 91,900",
      category: "Literatura"
    },
    {
      id: "dune",
      title: "Dune",
      description: "El clásico de ciencia ficción que inspiró películas y generaciones de lectores.",
      image: "../assets/images/libros/dune.jfif",
      price: "COP 99,900",
      category: "Ciencia Ficción"
    }
  ],

  novedades: [
    {
      id: "klara",
      title: "Klara y el Sol",
      description: "La nueva obra maestra de Kazuo Ishiguro sobre inteligencia artificial y humanidad.",
      image: "../assets/images/libros/klara.jfif",
      price: "COP 107,900",
      category: "Ciencia Ficción"
    },
    {
      id: "ciudad-vapor",
      title: "La Ciudad del Vapor",
      description: "Relatos que expanden el universo de 'La Sombra del Viento'.",
      image: "../assets/images/libros/ciudad-vapor.jfif",
      price: "COP 87,900",
      category: "Ficción"
    },
    {
      id: "susurros",
      title: "Susurros en la Niebla",
      description: "Un thriller psicológico que mantendrá en vilo hasta la última página.",
      image: "../assets/images/libros/susurros.jfif",
      price: "COP 79,900",
      category: "Thriller"
    },
    {
      id: "lapida",
      title: "La Lápida",
      description: "Una historia de misterio enterrada entre las tumbas del pasado.",
      image: "../assets/images/libros/lapida.jfif",
      price: "COP 84,900",
      category: "Misterio"
    }
  ],

  clasicos: [
    {
      id: "quijote",
      title: "Don Quijote de La Mancha",
      description: "La obra cumbre de Miguel de Cervantes y pilar de la literatura universal.",
      image: "../assets/images/libros/quijote.jfif",
      price: "COP 119,900",
      category: "Clásico"
    },
    {
      id: "orgullo",
      title: "Orgullo y Prejuicio",
      description: "La novela romántica de Jane Austen que definió un género literario.",
      image: "../assets/images/libros/orgullo-y-prejuicio.jfif",
      price: "COP 71,900",
      category: "Clásico"
    },
    {
      id: "moby-dick",
      title: "Moby Dick",
      description: "La épica aventura de Herman Melville sobre la obsesión y el mar.",
      image: "../assets/images/libros/moby-dick.jfif",
      price: "COP 95,900",
      category: "Aventuras"
    },
    {
      id: "frankenstein",
      title: "Frankenstein",
      description: "El clásico de Mary Shelley que explora los límites de la ciencia y la moral.",
      image: "../assets/images/libros/frankenstein.jfif",
      price: "COP 65,900",
      category: "Terror"
    }
  ],
};

// ===================================
// FUNCIONALIDADES DE MODALES
// ===================================
let currentBook = null;

function openBookDetails(book) {
    currentBook = book;
    document.getElementById('detailImage').src = book.image;
    document.getElementById('detailTitle').textContent = book.title;
    document.getElementById('detailCategory').textContent = book.category;
    document.getElementById('detailDescription').textContent = book.description;
    document.getElementById('detailPrice').textContent = book.price;
    
    document.getElementById('bookDetailsModal').classList.remove('hidden');
}

function closeBookDetails() {
    document.getElementById('bookDetailsModal').classList.add('hidden');
}

function openEditBook() {
    if (!currentBook) return;
    
    document.getElementById('editTitle').value = currentBook.title;
    document.getElementById('editDescription').value = currentBook.description;
    document.getElementById('editPrice').value = currentBook.price.replace('COP ', '');
    
    document.getElementById('editBookModal').classList.remove('hidden');
}

function closeEditBook() {
    document.getElementById('editBookModal').classList.add('hidden');
}

function openAddNewBook() {
    document.getElementById('addNewBookModal').classList.remove('hidden');
}

function closeAddNewBook() {
    document.getElementById('addNewBookModal').classList.add('hidden');
}

function openSalesDetails() {
    if (!currentBook) return;
    
    // Generar datos de ventas de ejemplo
    const salesData = [
        { id: "V-001", date: "2023-05-15", client: "María Rodríguez", quantity: 2, total: "COP 159,800", status: "Completado" },
        { id: "V-002", date: "2023-05-10", client: "Carlos Gómez", quantity: 1, total: "COP 79,900", status: "Completado" },
        { id: "V-003", date: "2023-05-08", client: "Laura Martínez", quantity: 3, total: "COP 239,700", status: "Pendiente" },
        { id: "V-004", date: "2023-05-05", client: "Pedro Sánchez", quantity: 1, total: "COP 79,900", status: "Completado" },
        { id: "V-005", date: "2023-05-01", client: "Ana López", quantity: 2, total: "COP 159,800", status: "Cancelado" }
    ];
    
    const tableBody = document.getElementById('salesTableBody');
    tableBody.innerHTML = '';
    
    salesData.forEach(sale => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="py-2 px-4 border-b">${sale.id}</td>
            <td class="py-2 px-4 border-b">${sale.date}</td>
            <td class="py-2 px-4 border-b">${sale.client}</td>
            <td class="py-2 px-4 border-b">${sale.quantity}</td>
            <td class="py-2 px-4 border-b">${sale.total}</td>
            <td class="py-2 px-4 border-b">
                <span class="${getStatusClass(sale.status)} px-2 py-1 rounded-full text-xs">
                    ${sale.status}
                </span>
            </td>
        `;
        tableBody.appendChild(row);
    });
    
    document.getElementById('salesDetailsModal').classList.remove('hidden');
}

function getStatusClass(status) {
    switch(status.toLowerCase()) {
        case 'completado': return 'bg-green-100 text-green-800';
        case 'pendiente': return 'bg-yellow-100 text-yellow-800';
        case 'cancelado': return 'bg-red-100 text-red-800';
        default: return 'bg-gray-100 text-gray-800';
    }
}

function closeSalesDetails() {
    document.getElementById('salesDetailsModal').classList.add('hidden');
}

// ===================================
// INICIALIZACIÓN
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar carruseles
    document.querySelectorAll('.book-carousel').forEach(container => {
        const carouselId = container.dataset.carouselId;
        const books = booksData[carouselId] || [];
        if (books.length > 0) {
            new BookCarousel(container, books);
        }
    });
    
    // Event listeners para modales
    document.getElementById('closeDetailsModal').addEventListener('click', closeBookDetails);
    document.getElementById('closeEditBookModal').addEventListener('click', closeEditBook);
    document.getElementById('closeSalesDetailsModal').addEventListener('click', closeSalesDetails);
    
    // Botones de acción
    document.getElementById('addNewBookBtn').addEventListener('click', openAddNewBook);
    document.getElementById('editBookBtn').addEventListener('click', openEditBook);
    document.getElementById('salesDetailsBtn').addEventListener('click', openSalesDetails);
    document.getElementById('addNewBookBtn2').addEventListener('click', openAddNewBook);

    // Event listeners para cerrar modales al hacer clic fuera
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', function() {
            closeBookDetails();
            closeEditBook();
            closeSalesDetails();
        });
    });
});

// Función de cierre de sesión
function cerrarSesion() {
    localStorage.removeItem('usuarioActual');
    window.location.href = '../index.html';
}