import "./Forgot-password.scss";

const ForgotPassword = () => {
    return (
      <div>
        <header className="header">
        <div className="header-h1-div">
<h1 className="header-h1">iSocial</h1>
</div>
<div className="header-div-password">
    <input className="header-input" type="text" name="email" placeholder="Електронна адреса або номер телефону"/>
    <input className="header-input" type="password" placeholder="Пароль"/>
    <button className="header-btn">Увійти</button>
    <a href="#" className="header-div-password-a">Забули назву облікового запису?</a>
</div>
        </header>
        <main className="main">
         
<div className="modal">
<h2 className="modal-h2">Знайдіть свій обліковий запис</h2>
<div className="modal-line"></div>
<p className="modal-p">Please enter your email or mobile number to search for your account.</p>
<input className="modal-input" type="text" placeholder="Ел.адреса або номер телефону"/>
<div className="modal-line"></div>
<div className="modal-btn">
    <button className="btn-cancel">Скасувати</button>
    <button className="btn-find">Шукати</button>
</div>
</div>

        </main>
        <footer className="footer">

        </footer>
            </div>
    )
  }
  
  export default ForgotPassword