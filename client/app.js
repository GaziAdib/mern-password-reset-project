<Route path='/password-reset' element={<PrivateRoute><PasswordResetPage /></PrivateRoute>} />
<Route path='/forgotpassword/:id/:token' element={<PrivateRoute><ForgotPasswordPage /></PrivateRoute>} />
<Route path="*" element={<ErrorPage />} />