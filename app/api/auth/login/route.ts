import { NextResponse } from "next/server";

const DUMMY_USER = {
    email: "admin@gmail.com",
    password: "password",
};

export async function POST(request: Request){
    try {
        const { email, password } = await request.json();
        // Kondisi ketika email atau password tidak diisi
        if (!email || !password) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Email dan password wajib diisi.",
                },
                { status: 400}
            );
        }
        // Kondisi ketika email atau password salah
        if (email !== DUMMY_USER.email || password !== DUMMY_USER.password) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Email atau password salah.",
                },
                { status: 401 }
            )
        }
        // Kondisi ketika berhasil login
        return NextResponse.json(
            {
                success: true,
                message: "Login berhasil.",
                user: {
                    email: DUMMY_USER.email,
                },
                
            },
            { status: 200 }  
        );
    } catch  {
        // Kondisi ketika terjadi kesalahan pada server
        return NextResponse.json(
            {
                success: false,
                message: "Terjadi kesalahan pada server.",                            
            },
            { status: 500 }  
        );
    }
}