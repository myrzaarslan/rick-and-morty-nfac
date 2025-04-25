import React from 'react';
import { Link } from 'react-router-dom';
import { User, Tv, Map } from 'lucide-react';

const HomePage: React.FC = () => {
  const sections = [
    {
      title: 'Персонажи',
      description: 'Исследуйте всех персонажей сериала, от Рика и Морти до самых редких второстепенных героев.',
      icon: <User size={40} className="text-indigo-500 dark:text-green-400" />,
      path: '/characters',
      color: 'from-indigo-500 to-purple-600 dark:from-green-400 dark:to-teal-500',
    },
    {
      title: 'Эпизоды',
      description: 'Просмотрите все эпизоды каждого сезона Рика и Морти.',
      icon: <Tv size={40} className="text-pink-500 dark:text-yellow-400" />,
      path: '/episodes',
      color: 'from-pink-500 to-red-600 dark:from-yellow-400 dark:to-amber-500',
    },
    {
      title: 'Локации',
      description: 'Откройте для себя удивительные места во всей мультивселенной.',
      icon: <Map size={40} className="text-blue-500 dark:text-blue-400" />,
      path: '/locations',
      color: 'from-blue-500 to-cyan-600 dark:from-blue-400 dark:to-cyan-500',
    },
  ];

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-5xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-green-400 dark:to-teal-400">
          Путеводитель по Рику и Морти
        </h1>
        <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
          Ваш портал в безумную мультивселенную Рика и Морти. Исследуйте персонажей, эпизоды и локации из популярного анимационного сериала.
        </p>
      </div>

      <div className="relative w-64 h-64 mb-16">
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-400 to-teal-500 animate-pulse flex items-center justify-center overflow-hidden">
          <div className="absolute w-56 h-56 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-spin-slow"></div>
          <div className="absolute w-40 h-40 rounded-full bg-gray-100 dark:bg-gray-900 flex items-center justify-center z-10">
            <span className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-teal-500">Р&М</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
        {sections.map((section, index) => (
          <Link
            key={index}
            to={section.path}
            className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
          >
            <div className={`h-2 bg-gradient-to-r ${section.color}`}></div>
            <div className="p-6">
              <div className="bg-gray-100 dark:bg-gray-700 rounded-full w-16 h-16 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                {section.icon}
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{section.title}</h2>
              <p className="text-gray-600 dark:text-gray-400">{section.description}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-16 p-8 bg-indigo-50 dark:bg-gray-800/50 rounded-xl shadow-md max-w-5xl w-full">
        <h2 className="text-2xl font-bold text-indigo-700 dark:text-green-400 mb-4">О приложении</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Этот путеводитель по Рику и Морти - фанатский проект, использующий API Рика и Морти. Просматривайте персонажей, эпизоды и локации из сериала с помощью нашего удобного интерфейса.
        </p>
        <p className="text-gray-700 dark:text-gray-300">
          Используйте навигацию выше, чтобы начать исследование мультивселенной!
        </p>
      </div>
    </div>
  );
};

export default HomePage;