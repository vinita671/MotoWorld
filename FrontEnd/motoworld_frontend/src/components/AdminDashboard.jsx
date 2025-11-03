// import React from "react";

// function AdminDashboard() {
//   const name = localStorage.getItem("userName") || "Admin";

//   return (
//     <div className="page-contacts">
//       <div className="page-wrapper">
//         <main className="page-main">

//           {/* 🔹 Background Hero Section */}
//           <div className="section-hero">
//             <div
//               className="section-hero__bg"
//               style={{ backgroundImage: "url(/src/assets/img/bg/contacts.jpg)" }}
//             >
//               <div className="uk-container">
//                 <div className="section-hero__content">
//                   <div className="section-hero__title">
//                     <span>Welcome back, {name}!</span>
//                     <div className="uk-h1">Admin Dashboard</div>
//                   </div>
//                   <div className="section-hero__breadcrumb">
//                     <ul className="uk-breadcrumb">
//                       <li>
//                         <a href="/">Home</a>
//                       </li>
//                       <li>
//                         <span>Admin Dashboard</span>
//                       </li>
//                     </ul>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* 🔹 Dashboard Content */}
//           <div className="uk-container uk-margin-large-top uk-margin-large-bottom uk-text-justify">
            
//             {/* Section 1 */}
//             <h3 className="uk-text-danger">User Management</h3>
//             <p>
//               As an admin, you can view, edit, and delete user accounts.
//               Keep track of registered users, their roles, and activity on the platform.
//               Maintain transparency and ensure only authorized access.
//             </p>

//             {/* Section 2 */}
//             <h3 className="uk-text-danger">Showroom Management</h3>
//             <p>
//               Manage showroom details such as name, address, available bikes, and contact information.
//               Update or add new showrooms anytime to keep your listings accurate and fresh.
//             </p>

//             {/* Section 3 */}
//             <h3 className="uk-text-danger">Booking Overview</h3>
//             <p>
//               Keep an eye on all customer bookings in real time.
//               Approve, reject, or review pending requests and ensure smooth communication
//               between showrooms and customers.
//             </p>

//             {/* Section 4 */}
//             <h3 className="uk-text-danger">Reports & Insights</h3>
//             <p>
//               View platform analytics such as total users, total bookings, and most popular bikes.
//               Analyze data trends to improve customer satisfaction and business performance.
//             </p>

//             {/* Section 5 */}
//             <h3 className="uk-text-danger">Security & Roles</h3>
//             <p>
//               Assign specific roles like Admin, Staff, or Viewer.
//               Manage authentication and authorization seamlessly with complete control over system access.
//             </p>

//             {/* Section 6 */}
//             <div className="uk-card uk-card-secondary uk-card-body uk-border-rounded uk-light uk-text-center uk-margin-large-top" 
//             style={{backgroundColor: "#f3ef09ff"}}>
//               <h4 className="uk-text-uppercase">MotoWorld Admin Panel</h4>
//               <p>
//                 Welcome to the <strong>control center</strong> of MotoWorld. Here you can
//                 manage everything that keeps our platform running smoothly —
//                 users, bookings, showrooms, and reports — all at your fingertips!
//               </p>
//             </div>
//           </div>

//         </main>
//       </div>
//     </div>
//   );
// }

// export default AdminDashboard;
