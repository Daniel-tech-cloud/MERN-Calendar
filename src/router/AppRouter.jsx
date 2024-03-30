import { Navigate, Route, Routes } from "react-router-dom"
import { LoginPage } from "../auth";
import { CalendarPage } from "../calendar";

export const AppRouter = () => {
    
    const authstatus = 'not-authenticated'; // 'authenticated';
    
    return (
        <Routes>
            {
                ( authstatus === 'not-authenticated') 
                    ? <Route path="/*" element={<Navigate to={ "/auth/login" } />} />
                    : <Route path="/auth/*" element={<LoginPage />} />
            }

            <Route path="/*" element={<CalendarPage />} />

        </Routes>      
    )
}