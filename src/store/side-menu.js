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
        pageName: 'cafes',
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
        icon: 'MessageSquareIcon',
        pageName: 'side-menu-chat',
        title: 'Chat'
      },
      {
        icon: 'FileTextIcon',
        pageName: '',
        title: 'Menu',
        subMenu: [
          {
            icon: 'TagIcon',
            pageName: 'categories',
            title: 'Categories'
          },
          {
            icon: 'ShoppingCartIcon',
            pageName: 'products',
            title: 'Products'
          },
          {
            icon: 'DatabaseIcon',
            pageName: 'modifiers',
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
      // {
      //   icon: 'MessageCircleIcon',
      //   pageName: 'test',
      //   title: 'Messages'
      // },
      {
        icon: 'UserPlusIcon',
        pageName: 'customer',
        title: 'Customers'
      }
      // {
      //   icon: 'DollarSignIcon',
      //   pageName: 'tariffs',
      //   title: 'Tariffs'
      // }
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
