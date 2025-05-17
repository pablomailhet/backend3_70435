document.addEventListener('DOMContentLoaded', () => {
    const formRegister = document.getElementById("registerForm")

    formRegister.addEventListener('submit', async (e) => {
        try {
            e.preventDefault()

            const formData = new FormData(formRegister) //Consulto el HTML y lo transformo en un objeto iterator

            const userData = Object.fromEntries(formData) //Transformo un objeto iterator en un objeto simple

            const response = await fetch(`${window.location.origin}/api/sessions/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userData),
                credentials: "include" //Permitir el trabajo via cookies
            })

            if (response.ok) {
                const data = await response.json()
                if (data?.status === "success") {
                    Toastify({
                        text: data.message,
                        duration: 3000,
                        close: true,
                        gravity: "top",
                        position: "right",
                        stopOnFocus: true,
                        style: {
                            background: "linear-gradient(to right, #00b09b, #96c93d)",
                        },
                        onClick: function () { }
                    }).showToast();
                    setTimeout(() => {
                        window.location.href = `${window.location.origin}/api/sessions/viewlogin`
                    }, 1000);
                }
                else {
                    console.log(data);
                }
            }
            else {
                console.log(response);
            }
        }
        catch (e) {
            console.log(e);
        }
    })
})