const state = () => {
  return {
    menu: [
      {
        icon: 'HomeIcon',
        pageName: 'admin',
        title: 'Dashboard'
      },
      {
        icon: 'SettingsIcon',
        pageName: 'admin-company',
        title: 'Companies'
      },
      {
        icon: 'CoffeeIcon',
        pageName: 'admin-cafes',
        title: 'My cafes'
        // subMenu: [
        //   {
        //     icon: '',
        //     pageName: 'admin-side-menu-cafe-data-list',
        //     title: 'List'
        //   },
        //   {
        //     icon: '',
        //     pageName: 'admin-side-menu-cafe-add-form',
        //     title: 'Add new cafe'
        //   }
        // ]
      },
      {
        icon: 'MessageSquareIcon',
        pageName: 'admin-side-menu-chat',
        title: 'Chat'
      },
      {
        icon: 'FileTextIcon',
        pageName: 'admin-',
        title: 'Menu',
        subMenu: [
          {
            icon: 'TagIcon',
            pageName: 'admin-categories',
            title: 'Categories'
          },
          {
            icon: 'ShoppingCartIcon',
            pageName: 'admin-products',
            title: 'Products'
          },
          {
            icon: 'DatabaseIcon',
            pageName: 'admin-modifiers',
            title: 'Modifires'
          }
        ]
      },
      {
        icon: 'UsersIcon',
        pageName: 'admin-employees',
        title: 'Employees'
      }
      // {
      //   icon: 'CreditCardIcon',
      //   pageName: 'admin-transactions',
      //   title: 'Transactions'
      // },
      // {
      //   icon: 'MessageCircleIcon',
      //   pageName: 'admin-test',
      //   title: 'Messages'
      // },
      // {
      //   icon: 'UserPlusIcon',
      //   pageName: 'admin-customer',
      //   title: 'Customers'
      // }
      // {
      //   icon: 'DollarSignIcon',
      //   pageName: 'admin-tariffs',
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
