import React, { useContext, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// funcitonal components
import ScrollToTop from "./scrollToTop";
import injectContext from "../store/appContext";
import { Context } from "../store/appContext";

// Layout
import LogoLayout from "../layouts/LogoLayout";
import DashboardLayout from "../layouts/DashLayout";
import NavbarLayout from "../layouts/NavbarLayout";
import NavbarExamLayout from "../layouts/NavbarExamLayout.js";

// Pages
import Login from "../pages/login/login.js";
import Home from "../pages/home/Home.js";
import Signup from "../pages/login/Signup";
import PaymentPlan from "../pages/paymentPlan/paymentPlan.js";
import SelectCategory from "../pages/selectCategory/SelectCategory.js";
import CheckoutForm from "../layouts/components/checkoutForm.js";
import Questions from "../pages/questions/questions.js";
import Exam from "../pages/exam/exam.js";
import PasswordRequest from "../pages/login/PasswordRequest.js";
import PasswordSetting from "../pages/login/PasswordSetting.js";
import Dashboard from "../pages/dashboard/Dashboard.js";
import File404 from "../pages/404/File404";
import { Return } from "../pages/Stripe/return.js";



const Router = () => {

	//the basename is used when your project is published in a subdirectory and not in the root of the domain
	// you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
	const basename = process.env.BASENAME || "";

	return (
		<div>
			<BrowserRouter basename={basename}>
				<ScrollToTop>
					<Routes>

						{/* FRONTPAGE */}
						<Route index element={<NavbarLayout><Home /></NavbarLayout>} />
						<Route path="*" element={<NavbarLayout><File404 /></NavbarLayout>} />

						{/* SIGNUP */}
						<Route path="/login" element={<NavbarLayout><Login /></NavbarLayout>} />
						<Route path="/signup" element={<LogoLayout><Signup /></LogoLayout>} />
						<Route path="/password-request/" element={<LogoLayout><PasswordRequest /></LogoLayout>} />
						<Route path="/password-setting" element={<LogoLayout><PasswordSetting /></LogoLayout>} />
						{/* <Route path="/password-setting/*" element={<LogoLayout><PasswordSetting /></LogoLayout>} /> */}

						{/* PAYMENT PAGES */}
						<Route path="/paymentplan" element={<DashboardLayout><PaymentPlan /></DashboardLayout>} />
						<Route path="/paymentdetails" element={<DashboardLayout><CheckoutForm /></DashboardLayout>} />
						<Route path="/selectcategory/" element={<DashboardLayout><SelectCategory /></DashboardLayout>} />
						<Route path="/return" element={<DashboardLayout><Return /></DashboardLayout>} />


						{/* DASHBOARD */}
						<Route path="/dashboard" element={<DashboardLayout><Dashboard /></DashboardLayout>} />
						<Route path="/questions" element={<NavbarLayout><Questions /></NavbarLayout>} />
						<Route path="/exam" element={<NavbarExamLayout><Exam /></NavbarExamLayout>} />

					</Routes>
				</ScrollToTop>
			</BrowserRouter>
		</div>
	);
};

export default injectContext(Router);
