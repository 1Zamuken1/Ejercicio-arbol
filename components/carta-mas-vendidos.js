// ===================================
// CARRUSEL DE LIBROS REUTILIZABLE
// ===================================

// Clase para manejar el carrusel de libros
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

    // Determina cuántos libros mostrar por slide según el tamaño de pantalla
    getBooksPerSlide() {
        if (window.innerWidth >= 1024) return 4; // lg y superior
        if (window.innerWidth >= 768) return 3;  // md
        if (window.innerWidth >= 640) return 2;  // sm
        return 1; // xs
    }

    // Inicializa el carrusel
    init() {
        this.render();
        this.updateIndicators();
    }

    // Renderiza todo el carrusel
    render() {
        const slides = this.createSlides();
        const indicators = this.createIndicators();
        const controls = this.createControls();

        this.container.innerHTML = `
            <div class="relative w-full bg-red-950 rounded-xl shadow-lg overflow-hidden">
                <!-- Carousel wrapper -->
                <div class="carousel-wrapper relative h-auto overflow-hidden" id="wrapper-${this.carouselId}">
                    ${slides}
                </div>
                
                <!-- Indicadores -->
                ${this.totalSlides > 1 ? `
                    <div class="absolute z-30 flex -translate-x-1/2 bottom-4 left-1/2 space-x-2">
                        ${indicators}
                    </div>
                ` : ''}
                
                <!-- Controles -->
                ${this.totalSlides > 1 ? controls : ''}
            </div>
        `;
    }

    // Crea todos los slides del carrusel
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

    // Crea una tarjeta individual de libro
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
                            <button onclick="showBookDetails('${book.id}')" 
                                    class="flex-1 px-3 py-2 text-sm font-medium text-center text-blue-700 border border-blue-700 rounded-lg hover:bg-blue-700 hover:text-white transition-colors duration-200">
                                Saber más
                            </button>
                            <button onclick="buyBook('${book.id}')" 
                                    class="flex-1 px-3 py-2 text-sm font-medium text-center text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors duration-200">
                                Comprar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // Crea los indicadores de posición
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

    // Crea los controles de navegación
    createControls() {
        return `
            <!-- Botón anterior -->
            <button type="button" 
                    class="carousel-prev absolute top-1/2 left-4 z-30 -translate-y-1/2 flex items-center justify-center group">
                <span class="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/80 hover:bg-white shadow-lg transition-all duration-200 hover:scale-110">
                    <svg class="w-5 h-5 text-gray-800" fill="none" viewBox="0 0 6 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4" />
                    </svg>
                </span>
            </button>
            
            <!-- Botón siguiente -->
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

    // Configura los event listeners
    setupEventListeners() {
        // Event listeners para indicadores
        this.container.querySelectorAll('.indicator').forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.goToSlide(index));
        });

        // Event listeners para controles
        const prevBtn = this.container.querySelector('.carousel-prev');
        const nextBtn = this.container.querySelector('.carousel-next');
        
        if (prevBtn) prevBtn.addEventListener('click', () => this.prevSlide());
        if (nextBtn) nextBtn.addEventListener('click', () => this.nextSlide());

        // Auto-play opcional (descomenta para activar)
        // this.startAutoPlay();
    }

    // Configura la responsividad
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

    // Navega a un slide específico
    goToSlide(slideIndex) {
        if (slideIndex >= 0 && slideIndex < this.totalSlides) {
            this.currentSlide = slideIndex;
            this.updateSlides();
            this.updateIndicators();
        }
    }

    // Navega al siguiente slide
    nextSlide() {
        const nextIndex = (this.currentSlide + 1) % this.totalSlides;
        this.goToSlide(nextIndex);
    }

    // Navega al slide anterior
    prevSlide() {
        const prevIndex = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
        this.goToSlide(prevIndex);
    }

    // Actualiza la visualización de los slides
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

    // Actualiza los indicadores
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

    // Inicia el auto-play (opcional)
    startAutoPlay(interval = 5000) {
        setInterval(() => {
            this.nextSlide();
        }, interval);
    }
}

// ===================================
// DATOS DE LIBROS
// ===================================

// Aquí defines los libros para cada carrusel
const booksData = {
  masvendidos: [
    {
      id: "hp1",
      title: "Harry Potter y la Piedra Filosofal",
      description: "El inicio de la saga mágica más famosa del mundo. Acompaña a Harry en su primera aventura en Hogwarts.",
      image: "../assets/images/libros/harry-potter-piedra.jfif",
      price: "COP 79,900",
    },
    {
      id: "hobbit",
      title: "El Hobbit",
      description: "La extraordinaria aventura de Bilbo Bolsón que cambió para siempre la Tierra Media.",
      image: "../assets/images/libros/el-hobbit.jfif",
      price: "COP 63,900",
    },
    {
      id: "cien-anos",
      title: "Cien Años de Soledad",
      description: "La obra maestra de Gabriel García Márquez que define el realismo mágico.",
      image: "../assets/images/libros/cien-anos-de-soledad.jfif",
      price: "COP 91,900",
    },
    {
      id: "dune",
      title: "Dune",
      description: "El clásico de ciencia ficción que inspiró películas y generaciones de lectores.",
      image: "../assets/images/libros/dune.jfif",
      price: "COP 99,900",
    },
    {
      id: "1984",
      title: "1984",
      description: "La distopía de George Orwell que predijo nuestro futuro tecnológico.",
      image: "../assets/images/libros/1984.jfif",
      price: "COP 75,900",
    },
    {
      id: "fuego",
      title: "Juego de Tronos",
      description: "La historia épica de Westeros donde el poder y la traición reinan.",
      image: "../assets/images/libros/juego-de-tronos.jfif",
      price: "COP 85,900",
    },
    {
      id: "paulo",
      title: "El Alquimista",
      description: "Una fábula sobre seguir tus sueños y encontrar tu leyenda personal.",
      image: "../assets/images/libros/el-alquimista.jfif",
      price: "COP 58,900",
    },
    {
      id: "divergente",
      title: "Divergente",
      description: "Una sociedad dividida por virtudes. Una chica que desafía todo.",
      image: "../assets/images/libros/divergente.jfif",
      price: "COP 69,900",
    },
  ],

  novedades: [
    {
      id: "klara",
      title: "Klara y el Sol",
      description: "La nueva obra maestra de Kazuo Ishiguro sobre inteligencia artificial y humanidad.",
      image: "../assets/images/libros/klara.jfif",
      price: "COP 107,900",
    },
    {
      id: "ciudad-vapor",
      title: "La Ciudad del Vapor",
      description: "Relatos que expanden el universo de 'La Sombra del Viento'.",
      image: "../assets/images/libros/ciudad-vapor.jfif",
      price: "COP 87,900",
    },
    {
      id: "susurros",
      title: "Susurros en la Niebla",
      description: "Un thriller psicológico que mantendrá en vilo hasta la última página.",
      image: "../assets/images/libros/susurros.jfif",
      price: "COP 79,900",
    },
    {
      id: "lapida",
      title: "La Lápida",
      description: "Una historia de misterio enterrada entre las tumbas del pasado.",
      image: "../assets/images/libros/lapida.jfif",
      price: "COP 84,900",
    },
    {
      id: "invisible",
      title: "Invisible",
      description: "¿Hasta dónde puede llegar el silencio de un adolescente?",
      image: "../assets/images/libros/invisible.jfif",
      price: "COP 73,900",
    },
    {
      id: "anhelo",
      title: "Anhelo",
      description: "Una historia juvenil con romance y fantasía sobrenatural.",
      image: "../assets/images/libros/anhelo.jfif",
      price: "COP 92,900",
    },
    {
      id: "karma",
      title: "El Karma de Vivir",
      description: "Reflexiones sobre decisiones y consecuencias.",
      image: "../assets/images/libros/karma.jfif",
      price: "COP 68,900",
    },
    {
      id: "destino",
      title: "Contra el Destino",
      description: "Un relato de valentía ante lo inevitable.",
      image: "../assets/images/libros/contra-destino.jfif",
      price: "COP 79,900",
    },
  ],

  clasicos: [
    {
      id: "quijote",
      title: "Don Quijote de La Mancha",
      description: "La obra cumbre de Miguel de Cervantes y pilar de la literatura universal.",
      image: "../assets/images/libros/quijote.jfif",
      price: "COP 119,900",
    },
    {
      id: "orgullo",
      title: "Orgullo y Prejuicio",
      description: "La novela romántica de Jane Austen que definió un género literario.",
      image: "../assets/images/libros/orgullo-y-prejuicio.jfif",
      price: "COP 71,900",
    },
    {
      id: "moby-dick",
      title: "Moby Dick",
      description: "La épica aventura de Herman Melville sobre la obsesión y el mar.",
      image: "../assets/images/libros/moby-dick.jfif",
      price: "COP 95,900",
    },
    {
      id: "frankenstein",
      title: "Frankenstein",
      description: "El clásico de Mary Shelley que explora los límites de la ciencia y la moral.",
      image: "../assets/images/libros/frankenstein.jfif",
      price: "COP 65,900",
    },
    {
      id: "dracula",
      title: "Drácula",
      description: "El icónico vampiro que dio origen al mito moderno.",
      image: "../assets/images/libros/dracula.jfif",
      price: "COP 72,900",
    },
    {
      id: "emma",
      title: "Emma",
      description: "Otra joya de Jane Austen que combina ingenio, romance y crítica social.",
      image: "../assets/images/libros/emma.jfif",
      price: "COP 74,900",
    },
    {
      id: "corazon",
      title: "Corazón, Diario de un Niño",
      description: "Un clásico de la literatura italiana para jóvenes con grandes valores.",
      image: "../assets/images/libros/corazon.jfif",
      price: "COP 61,900",
    },
    {
      id: "fausto",
      title: "Fausto",
      description: "La tragedia filosófica de Goethe sobre el pacto con el diablo.",
      image: "../assets/images/libros/fausto.jfif",
      price: "COP 82,900",
    },
  ],
};


// ===================================
// FUNCIONES DE INICIALIZACIÓN
// ===================================

// Función para inicializar todos los carruseles
function initializeCarousels() {
    document.querySelectorAll('.book-carousel').forEach(container => {
        const carouselId = container.dataset.carouselId;
        const books = booksData[carouselId] || [];
        if (books.length > 0) {
            new BookCarousel(container, books);
        } else {
            console.warn(`No se encontraron libros para el carrusel: ${carouselId}`);
        }
    });
}

// ===================================
// FUNCIONES DE BOTONES (PERSONALIZAR)
// ===================================

// Función para mostrar detalles del libro
function showBookDetails(bookId) {
    // Encuentra el libro en todos los datos
    let foundBook = null;
    
    Object.values(booksData).forEach(bookArray => {
        const book = bookArray.find(b => b.id === bookId);
        if (book) foundBook = book;
    });
    
    if (foundBook) {
        // Aquí puedes implementar tu lógica personalizada
        // Por ejemplo: mostrar un modal, redirigir a otra página, etc.
        alert(`Detalles de: ${foundBook.title}\n\nDescripción: ${foundBook.description}\n\nPrecio: ${foundBook.price}`);
        
        // Ejemplo de redirección:
        // window.location.href = `detalles.html?id=${bookId}`;
        
        // Ejemplo de modal (necesitarías crear el modal):
        // openBookModal(foundBook);
    } else {
        console.error(`Libro no encontrado: ${bookId}`);
    }
}

// Función para comprar libro
function buyBook(bookId) {
    // Encuentra el libro en todos los datos
    let foundBook = null;
    
    Object.values(booksData).forEach(bookArray => {
        const book = bookArray.find(b => b.id === bookId);
        if (book) foundBook = book;
    });
    
    if (foundBook) {
        // Aquí puedes implementar tu lógica de compra
        // Por ejemplo: agregar al carrito, redirigir al checkout, etc.
        alert(`¡Agregando al carrito!\n\nLibro: ${foundBook.title}\nPrecio: ${foundBook.price}`);
        
        // Ejemplo de agregar al carrito:
        // addToCart(foundBook);
        
        // Ejemplo de redirección al checkout:
        // window.location.href = `checkout.html?id=${bookId}`;
        
        // Ejemplo de integración con sistema de pago:
        // initiatePayment(foundBook);
    } else {
        console.error(`Libro no encontrado: ${bookId}`);
    }
}

// ===================================
// INICIALIZACIÓN AUTOMÁTICA
// ===================================

// Inicializar carruseles cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', initializeCarousels);

// Reinicializar carruseles si se agrega contenido dinámicamente
function reinitializeCarousels() {
    initializeCarousels();
}