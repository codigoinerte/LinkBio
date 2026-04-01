import { ChevronRight } from 'lucide-react';
import { Header } from '../components';

export const Home = () => {
    return (
        <div className="bg-gray-50 min-h-screen flex flex-col">
            {/* Navigation */}
            <Header />

            {/* Hero Section */}
            <section className="py-12 lg:pt-15 lg:pb-20 flex flex-1">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center align-middle">
                    <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                
                        {/* Left Content */}
                        <div className="text-center lg:text-left">

                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight mb-6">
                                Tu perfil tipo Linktree, ahora con proyectos
                            </h1>
                        
                            <p className="text-gray-600 text-lg mb-8 max-w-lg mx-auto lg:mx-0">
                                Crea una sola pagina para compartir tus enlaces mas importantes y destacar tus proyectos con imagenes, descripcion y acceso directo.
                            </p>
                        
                            <a 
                                className="bg-indigo-600 hover:bg-indigo-900 text-white px-8 py-4 rounded-full font-semibold text-lg transition-colors inline-flex items-center group"
                                href='/auth'>
                                Crea tu perfil gratis
                                <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                            </a>
                        </div>
                        
                        {/* Right Content - Featured Artwork */}
                        <div className="relative">
                            <div className="text-center mb-8">
                                <img src='./assets/images/fc7366bd7a104be9a2e905bdce6440dc.webp' alt='mockup' title='mockup' className='rounded-3xl' />
                            </div>
                        </div>
                        
                    </div>
                </div>
            </section>
        </div>
    )
}
