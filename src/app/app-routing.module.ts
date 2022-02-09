import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './_guard/auth.guard';

const routes: Routes = [
  { path: 'home', loadChildren: () => import('./Home/home.module').then( m => m.HomePageModule) },
  { path: 'sign-up', loadChildren: './Auth/signup/signup.module#SignupPageModule' },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', loadChildren: () => import('./Auth/login/login.module').then( m => m.LoginPageModule) },
  { path: 'rider-sign-up', loadChildren: () => import('./Auth/rider-sign-up/rider-sign-up-routing.module').then( m => m.RiderSignUpPageRoutingModule) },
  { path: 'sign-up-option', loadChildren: () => import('./Auth/sign-up-options/sign-up-options-routing.module').then( m => m.SignUpOptionsPageRoutingModule) },
  {path: 'verify-email', loadChildren: () => import('./Auth/verify-email/verify-email.module').then(m => m.VerifyEmailPageModule)},
  // tslint:disable-next-line: max-line-length
  { path: 'reset-password', loadChildren: () => import('./Auth/reset-password/reset-password.module').then( m => m.ResetPasswordPageModule) },
  { path: 'no-network', loadChildren: () => import('./Modals/no-network/no-network.module').then( m => m.NoNetworkPageModule) },
  // use auth guard.
 // {path: '',
    // runGuardsAndResolvers: 'always',
    // canActivate: [AuthGuard],
    //children: [
            // tslint:disable-next-line: max-line-length
            { path: 'dashboard/edit-profile', loadChildren: () => import('./Dashboard/edit-profile/edit-profile.module').then( m => m.EditProfilePageModule) },
            { path: 'dashboard', loadChildren: () => import('./Dashboard/home/home.module').then( m => m.HomePageModule) },
            { path: ' ', loadChildren: () => import('./Dashboard/rider-dashboard/rider-dashboard.module').then( m => m.RiderDashboardPageModule) },
            // tslint:disable-next-line: max-line-length
            { path: 'dashboard/products/:id', loadChildren: () => import('./Dashboard/products/products.module').then( m => m.ProductsPageModule) },
            // tslint:disable-next-line: max-line-length
            { path: 'dashboard/notification-details', loadChildren: () => import('./Dashboard/notification-details/notification-details.module').then( m => m.NotificationDetailsPageModule) },

            { path: 'dashboard/notification', loadChildren: () => import('./Dashboard/notification/notification.module').then( m => m.NotificationPageModule) },
            // tslint:disable-next-line: max-line-length
            { path: 'dashboard/view-profile', loadChildren: () => import('./Dashboard/view-profile/view-profile.module').then( m => m.ViewProfilePageModule) },
            // tslint:disable-next-line: max-line-length
            { path: 'dashboard/add-address', loadChildren: () => import('./Dashboard/add-address/add-address.module').then( m => m.AddAddressPageModule) },
            // tslint:disable-next-line: max-line-length
            // tslint:disable-next-line: max-line-length
            { path: 'dashboard/page/about', loadChildren: () => import('./Dashboard/page/about/about.module').then( m => m.AboutPageModule) },
            { path: 'dashboard/product-single/1/:category_id/:product_id', loadChildren: () => import('./Dashboard/product-single/product-single.module').then( m => m.ProductSinglePageModule) },
            { path: 'dashboard/product-single/2/:category_id/:product_id', loadChildren: () => import('./Dashboard/product-single-two/product-single-two.module').then( m => m.ProductSingleTwoPageModule) },
            // tslint:disable-next-line: max-line-length
            { path: 'dashboard/checkout', loadChildren: () => import('./Dashboard/checkout/checkout.module').then( m => m.CheckoutPageModule) },
            { path: 'dashboard/pay', loadChildren: () => import('./Dashboard/pay/pay.module').then( m => m.PayPageModule) },
            { path: 'dashboard/pay-transfer', loadChildren: () => import('./Modals/transfer-payment/transfer-payment.module').then( m => m.TransferPaymentPageModule) },
            { path: 'dashboard/pay-wallet', loadChildren: () => import('./Modals/wallet-payment/wallet-payment-routing.module').then( m => m.WalletPaymentPageRoutingModule) },
            // tslint:disable-next-line: max-line-length
            { path: 'dashboard/payment-success', loadChildren: () => import('./Modals/payment-success/payment-success.module').then( m => m.PaymentSuccessPageModule) },
            { path: 'dashboard/wallet', loadChildren: () => import('./Dashboard/wallet/wallet.module').then( m => m.WalletPageModule) },
            // tslint:disable-next-line: max-line-length
            { path: 'dashboard/fund-wallet', loadChildren: () => import('./Dashboard/fund-wallet/fund-wallet.module').then( m => m.FundWalletPageModule) },
            { path: 'dashboard/orders', loadChildren: () => import('./Dashboard/orders/orders.module').then( m => m.OrdersPageModule) },
            // tslint:disable-next-line: max-line-length
            { path: 'dashboard/orders-details', loadChildren: () => import('./Dashboard/orders-details/orders-details.module').then( m => m.OrdersDetailsPageModule) },
            // tslint:disable-next-line: max-line-length
            { path: 'dashboard/track-orders', loadChildren: () => import('./Dashboard/track-orders/track-orders.module').then( m => m.TrackOrdersPageModule) },
            // tslint:disable-next-line: max-line-length
            { path: 'dashboard/track-orders-details', loadChildren: () => import('./Dashboard/track-orders-details/track-orders-details.module').then( m => m.TrackOrdersDetailsPageModule) },
            // tslint:disable-next-line: max-line-length
            { path: 'dashboard/order-fullfillment/:id', loadChildren: () => import('./Dashboard/order-fullfillment/order-fullfillment.module').then( m => m.OrderFullfillmentPageModule) },
            { path: 'dashboard/order-fullfillment-thankyou', loadChildren: () => import('./Dashboard/order-fullfillment-thankyou/order-fullfillment-thankyou.module').then( m => m.OrderFullfillmentThankyouPageModule) },
            // tslint:disable-next-line: max-line-length
            { path: 'dashboard/order-dispute/:id', loadChildren: () => import('./Dashboard/order-dispute/order-dispute.module').then( m => m.OrderDisputePageModule) },
            { path: 'dashboard/order-dispute-successpage/:id/:dispute_type', loadChildren: () => import('./Dashboard/order-dispute-successpage/order-dispute-successpage.module').then( m => m.OrderDisputeSuccesspagePageModule) },
            {
              path: 'dashboard/wallet-transaction',
              loadChildren: () => import('./Dashboard/wallet-transaction/wallet-transaction.module').then( m => m.WalletTransactionPageModule)
            },
    //]
 // },
  {
    path: 'verify-email',
    loadChildren: () => import('./Auth/verify-email/verify-email.module').then( m => m.VerifyEmailPageModule)
  },
  {
    path: 'sign-up-options',
    loadChildren: () => import('./Auth/sign-up-options/sign-up-options.module').then( m => m.SignUpOptionsPageModule)
  },
  {
    path: 'rider-sign-up',
    loadChildren: () => import('./Auth/rider-sign-up/rider-sign-up.module').then( m => m.RiderSignUpPageModule)
  },
  {
    path: 'wallet-payment',
    loadChildren: () => import('./Modals/wallet-payment/wallet-payment.module').then( m => m.WalletPaymentPageModule)
  },
  {
    path: 'transfer-payment',
    loadChildren: () => import('./Modals/transfer-payment/transfer-payment.module').then( m => m.TransferPaymentPageModule)
  },
  {
    path: 'add-drop-off-address',
    loadChildren: () => import('./Dashboard/add-drop-off-address/add-drop-off-address.module').then( m => m.AddDropOffAddressPageModule)
  },
  {
    path: 'add-drop-off-addresses',
    loadChildren: () => import('./Dashboard/add-drop-off-addresses/add-drop-off-addresses.module').then( m => m.AddDropOffAddressesPageModule)
  },
  {
    path: 'rider-dashboard',
    loadChildren: () => import('./Dashboard/rider-dashboard/rider-dashboard.module').then( m => m.RiderDashboardPageModule)
  },
  {
    path: 'dashboard-details',
    loadChildren: () => import('./Dashboard/dashboard-details/dashboard-details.module').then( m => m.DashboardDetailsPageModule)
  },
  {
    path: 'delivery-details',
    loadChildren: () => import('./Dashboard/delivery-details/delivery-details.module').then( m => m.DeliveryDetailsPageModule)
  },
  {
    path: 'pick-up-location',
    loadChildren: () => import('./Dashboard/pick-up-location/pick-up-location.module').then( m => m.PickUpLocationPageModule)
  },
  {
    path: 'dashboard/edit-profile-rider',
    loadChildren: () => import('./Dashboard/edit-profile-rider/edit-profile-rider.module').then( m => m.EditProfileRiderPageModule)
  },
  {
    path: 'notification-details',
    loadChildren: () => import('./Dashboard/notification-details/notification-details.module').then( m => m.NotificationDetailsPageModule)
  },
  {
    path: 'dashboard/add-item',
    loadChildren: () => import('./Dashboard/add-item/add-item.module').then( m => m.AddItemPageModule)
  },
  {
    path: 'password-reset',
    loadChildren: () => import('./Auth/password-reset/password-reset.module').then( m => m.PasswordResetPageModule)
  },
  {
    path: 'dashboard/edit-item',
    loadChildren: () => import('./Dashboard/edit-item/edit-item.module').then( m => m.EditItemPageModule)
  },
  // { path: 'order', loadChildren: () => import('./Modals/product/type-one/order/order.module').then( m => m.OrderPageModule) },
  // tslint:disable-next-line: max-line-length
  // { path: 'add-to-cart', loadChildren: () => import('./Modals/product/type-one/add-to-cart/add-to-cart.module').then( m => m.AddToCartPageModule) },
  // { path: 'no-network', loadChildren: () => import('./Utility/Modal/no-network/no-network.module').then( m => m.NoNetworkPageModule) },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
