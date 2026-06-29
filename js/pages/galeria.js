const galery = document.getElementById("galeria");

galery.querySelectorAll("img").forEach((img) => {
    img.addEventListener("click", () => {
        document.getElementById("image_viwer").innerHTML = `
            <div class="modal_overlay">
                <img id="close_modal_btn" src="../assets/icons/close.png" alt="Fechar">
                <img class="img_view" src="${img.src}">
            </div>
        `;

        document.getElementById("close_modal_btn").addEventListener("click", () => {
            document.getElementById("image_viwer").innerHTML = "";
        });
    });
});