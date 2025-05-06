import { useState, useEffect } from "react";

export default function VerificationPage() {
  const [codeSent, setCodeSent] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [fadeOutPhone, setFadeOutPhone] = useState(false);
  const [fadeOutVerification, setFadeOutVerification] = useState(false);
  const [countdownEnded, setCountdownEnded] = useState(false);

  const handleSendCode = () => {
    setFadeOutPhone(true);
    setTimeout(() => {
      setCodeSent(true);
      startCountdown();
    }, 500); // Attendre la fin de l'animation avant de montrer la section de vérification
  };

  const startCountdown = () => {
    setCountdown(30);
    setCountdownEnded(false);
    const timer = setInterval(() => {
      setCountdown((prevCount) => {
        if (prevCount <= 1) {
          clearInterval(timer);
          setCountdownEnded(true);
          return 0;
        }
        return prevCount - 1;
      });
    }, 1000);
  };

  const resendCode = () => {
    // Logique pour renvoyer le code
    startCountdown();
  };

  const changePhoneNumber = () => {
    setFadeOutVerification(true);
    setTimeout(() => {
      setCodeSent(false);
      setCountdownEnded(false);
      setFadeOutVerification(false);
      setFadeOutPhone(false);
    }, 500);
  };

  const verifyCode = () => {
    // Logique de vérification du code
    console.log("Code vérifié:", verificationCode);
  };

  // Effets de transition CSS
  useEffect(() => {
    if (fadeOutPhone && !codeSent) {
      setFadeOutPhone(false);
    }
    if (fadeOutVerification && codeSent) {
      setFadeOutVerification(false);
    }
  }, [codeSent, fadeOutPhone, fadeOutVerification]);

  return (
    <div className="flex flex-col bg-green-100 items-center justify-center min-h-screen p-4 text-white">
      <div className="w-full rounded-3xl max-w-md shadow-md p-3 bg-(--home-bg)">
        {/* Header */}
        <h1 className="text-center text-2xl font-semibold mb-6">
          <span className="text-green-900">Metch</span> App
        </h1>

        {/* Phone icon box */}
        <div className="bg-gray rounded p-10 flex justify-center items-center mb-6">
          <div className="flex flex-col items-center">
            <i className="fa-solid fa-phone texts-white mb-2"></i>
            <p className="text-sm text-white">Réception du code de vérification</p>
          </div>
        </div>
        650979295
        {/* Progress text */}
        <div className="text-center mb-4">
          <p className="font-medium text-lg mb-1 text-white">Vous y êtes presque...</p>
          <p className="text-sm text-white">
            Dernière étape pour devenir un propriétaire sur metch
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-xs mb-2 text-white">
            <span>Inscription</span>
            <span>Email</span>
            <span className="font-bold">Téléphone</span>
            <span>Terminé</span>
          </div>
          <div className="h-2 bg-green-800 rounded-full mb-1">
            <div className="h-full bg-white rounded-full" style={{ width: '75%' }}></div>
          </div>
          <div className="text-right text-xs text-white">3/4 étapes</div>
        </div>

        {/* Phone input - visible only when code hasn't been sent */}
        {!codeSent && (
          <div className={`transition-opacity duration-500 ${fadeOutPhone ? 'opacity-0' : 'opacity-100'}`}>
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2 text-center text-white">Numéro de Téléphone</label>
              <div className="flex">
                <div className="bg-green-800 border border-green-700 rounded-l px-3 py-2 text-sm text-white">
                  +237
                </div>
                <input
                  type="text"
                  placeholder="6XX XXX XXX"
                  className="flex-1 bg-green-800 border border-green-700 rounded-r px-3 py-2 text-sm text-white placeholder-white placeholder-opacity-60"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
            </div>

            {/* Send code button */}
            <button
              onClick={handleSendCode}
              className="w-full bg-green-500 hover:bg-green-400 text-white font-medium py-2 rounded mb-6"
            >
              Envoyer le Code de Vérification
            </button>
          </div>
        )}

        {/* Verification code section - only visible after code is sent */}
        {codeSent && (
          <div className={`mb-4 transition-opacity duration-500 ${fadeOutVerification ? 'opacity-0' : 'opacity-100'}`}>
            <h3 className="text-center font-medium mb-2 text-white">Entrez le Code de Vérification</h3>
            <p className="text-center text-sm mb-4 text-white">
              Nous avons envoyé un code de vérification au +237 XXX XXX XXX
            </p>
            
            {/* Code input */}
            <div className="mb-4 text-center">
              <p className="mb-2 text-sm text-white">Entrez le code à 6 chiffres</p>
              <input
                type="text"
                className="border border-green-700 bg-green-800 rounded px-3 py-2 w-full text-center text-white"
                maxLength={6}
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
              />
            </div>

            {/* Verify button */}
            <button
              onClick={verifyCode}
              className="w-full bg-green-500 hover:bg-green-400 text-white font-medium py-2 rounded mb-4"
            >
              Vérifier le Code
            </button>

            {/* Action buttons section */}
            {countdownEnded ? (
              <div className="flex gap-2">
                <button
                  onClick={resendCode}
                  className="flex-1 border border-green-500 text-white font-medium py-2 rounded hover:bg-green-800"
                >
                  Renvoyer le code
                </button>
                <button
                  onClick={changePhoneNumber}
                  className="flex-1 border border-green-700 text-white font-medium py-2 rounded hover:bg-green-800"
                >
                  Changer de numéro
                </button>
              </div>
            ) : (
              <p className="text-center text-white text-sm">
                Renvoyer le code dans {countdown} secondes
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}