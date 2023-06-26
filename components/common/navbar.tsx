import Link from 'next/link';

export default function Navbar(){
    return (
        <nav className="bg-gray-800 py-4">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex-shrink-0">
                        <Link href="/">
                            <div className="text-white text-xl font-bold">SupaOrder</div>
                        </Link>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            <Link href="/">
                                <div className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Home</div>
                            </Link>
                            <Link href="/orders">
                                <div className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Order List</div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};


