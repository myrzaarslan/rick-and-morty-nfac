# Rick and Morty Explorer

A comprehensive web application for exploring characters, episodes, and locations from the Rick and Morty universe.

![Rick and Morty Explorer](https://yt3.googleusercontent.com/cMxYvYoRuQx8ppkNZsMAkI-aLNFsPrtdwqkuylVnrsUag7Zyhco74kpBmoGOWyriAcfpZltRpw=s900-c-k-c0x00ffffff-no-rj)

## Features

- Browse and search characters, episodes, and locations from the Rick and Morty series
- View detailed information about each character, episode, and location
- Filter characters by status, gender, and species
- Filter locations by type and dimension
- Pagination for browsing large datasets
- Dark/light theme toggle with user preference storage
- Responsive design for mobile, tablet, and desktop
- Loading states and skeleton screens for improved user experience

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express
- **Routing**: React Router
- **State Management**: React Context API
- **API**: Rick and Morty API (via backend proxy)
- **Icons**: Lucide React
- **Build Tool**: Vite

## Why This Tech Stack?

- **React & TypeScript**: Provides a robust foundation with type safety, improving code quality and developer experience
- **Tailwind CSS**: Enables rapid UI development with utility classes while maintaining design consistency
- **Express Backend**: Creates a secure proxy to the Rick and Morty API, preventing CORS issues and enabling future enhancements
- **React Router**: Offers declarative routing with code-splitting potential
- **Context API**: Provides simple state management for theme preferences without additional dependencies
- **Vite**: Delivers fast development experience and optimized production builds

## Installation and Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/rick-and-morty-explorer.git
   cd rick-and-morty-explorer
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. For production:
   ```bash
   npm run build
   npm start
   ```

## Design and Development Process

1. **Planning**: Started by analyzing the Rick and Morty API to understand available endpoints and data structure.
2. **Architecture**: Designed a modular component structure with separation of concerns.
3. **UI Design**: Created a sci-fi inspired interface with portal-like elements referencing the show.
4. **Implementation**: Built the application in phases - core functionality first, then UI polish, and finally extra features.
5. **Testing**: Manually tested across devices and browsers for responsiveness and functionality.

## Unique Approaches

- **Portal-inspired animations**: Custom animations for loading states and the 404 page to match the show's aesthetic.
- **Efficient API usage**: Implemented a backend proxy to reduce API calls and provide better caching.
- **Adaptive theming**: Not just dark/light mode, but color shifts that change the entire feel of the application between modes.
- **Progressive loading**: Characters, episodes, and locations are loaded in optimized batches to improve performance.

## Design Compromises

- **Image optimization**: Using the original API images rather than optimizing them to reduce complexity, with the tradeoff of slightly longer load times.
- **Data persistence**: Chose not to implement local data caching to simplify the application, accepting that it requires more API calls.
- **Feature scope**: Focused on robust core features rather than implementing all possible API functionality, ensuring high quality for the main user journeys.

## Known Issues

- The Rick and Morty API occasionally experiences downtime, during which the application will display error messages.
- Some character images may load slowly on poor connections due to their original size.
- The application doesn't maintain search/filter state between page navigations.

## Future Enhancements

- Add local storage caching for recently viewed items
- Implement favorites functionality for saving preferred characters
- Add more detailed relationships between characters and locations
- Integrate with an AI service for additional character insights
- Optimize images with a media service

## Deployment

The application can be deployed to various platforms:

- **Vercel/Netlify**: For frontend with serverless functions
- **Heroku**: For the complete stack with Node.js backend
- **Docker**: Containerized deployment for custom hosting

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [Rick and Morty API](https://rickandmortyapi.com/) for providing the data
- The creators of React, Tailwind, and other open-source tools used in this project
