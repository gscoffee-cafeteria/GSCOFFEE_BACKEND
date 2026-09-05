import { Resend } from "resend";

const resend = new Resend(
    process.env.RESEND_API_KEY
);


export async function enviarCodigoRecuperacao(
    email,
    codigo
) {

    const { data, error } =
        await resend.emails.send({

            from:
                "GS Coffee <onboarding@resend.dev>",

            to: email,

            subject:
                "Recuperação de senha - GS Coffee",

            html: `
                <div style="
                    font-family: Arial, sans-serif;
                    max-width: 500px;
                    margin: auto;
                    padding: 25px;
                ">

                    <h2>
                        ☕ GS Coffee
                    </h2>

                    <p>
                        Recebemos uma solicitação para
                        redefinir sua senha.
                    </p>

                    <p>
                        Seu código de recuperação é:
                    </p>

                    <div style="
                        font-size: 28px;
                        font-weight: bold;
                        letter-spacing: 6px;
                        margin: 20px 0;
                    ">
                        ${codigo}
                    </div>

                    <p>
                        Esse código expira em 10 minutos.
                    </p>

                    <p>
                        Se você não solicitou a alteração
                        de senha, pode ignorar este e-mail.
                    </p>

                </div>
            `
        });


    if (error) {

        console.error(
            "Erro Resend:",
            error
        );

        throw new Error(
            error.message ||
            "Erro ao enviar e-mail"
        );

    }


    console.log(
        "E-mail de recuperação enviado:",
        data?.id
    );

}