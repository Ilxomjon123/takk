const state = () => {
  return {
    menu: [
      {
        icon: 'HomeIcon',
        pageName: 'dashboard',
        title: 'Dashboard'
      },
      {
        icon: 'SettingsIcon',
        pageName: 'company',
        title: 'Company Settings'
      },
      {
        icon: 'CoffeeIcon',
        pageName: 'side-menu-cafe',
        title: 'My cafes'
        // subMenu: [
        //   {
        //     icon: '',
        //     pageName: 'side-menu-cafe-data-list',
        //     title: 'List'
        //   },
        //   {
        //     icon: '',
        //     pageName: 'side-menu-cafe-add-form',
        //     title: 'Add new cafe'
        //   }
        // ]
      },
      {
        icon: 'FileTextIcon',
        pageName: '',
        title: 'Menu',
        subMenu: [
          {
            icon: 'ShoppingCartIcon',
            pageName: '',
            title: 'Products'
          },
          {
            icon: 'TagIcon',
            pageName: '',
            title: 'Categories'
          },
          {
            icon: 'DatabaseIcon',
            pageName: '',
            title: 'Modifires'
          }
        ]
      },
      {
        icon: 'UsersIcon',
        pageName: 'employees',
        title: 'Employees'
      },
      {
        icon: 'CreditCardIcon',
        pageName: 'transactions',
        title: 'Transactions'
      },
      {
        icon: 'MessageCircleIcon',
        pageName: 'test',
        title: 'News'
      },
      {
        icon: 'UserPlusIcon',
        pageName: 'customer',
        title: 'Customer'
      }
    ]
  };
};

// getters
const getters = {
  menu: state => state.menu
};

// actions
const actions = {};

// mutations
const mutations = {};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
