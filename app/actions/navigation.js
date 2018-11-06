// export const LOAD_NAVIGATION = 'LOAD_NAVIGATION';

// const loadNavigation = (navigationEntries) => ({
//   type: LOAD_NAVIGATION,
//   navigationEntries
// });

// export const fetchAllNavigationEntries = () => (dispatch) =>
//   // fetch('https://demo.goldencobra.de/api/v2/navigation_menus.json?id=1')
//   fetch('http://localhost:3000/api/v2/navigation_menus.json?id=1')
//     .then((response) => {
//       if (!response.ok) {
//         throw Error(response.statusText);
//       }
//       return response.json();
//     })
//     .then((data) => {
//       dispatch(loadNavigation(data.articles));
//     })
//     .catch((error) => {
//       dispatch(loadNavigation([]));
//       // console.error(error);
//     });
