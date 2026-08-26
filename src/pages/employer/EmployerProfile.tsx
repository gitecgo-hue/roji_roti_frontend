import { useEffect, useState } from "react";
import useEmployerStore from "@/store/employerStore";
import { useSession } from "@/lib/session";

export default function EmployerProfile() {
  const { employer, getEmployer, updateEmployerProfile, isLoading, sendPhoneUpdateOtp, updatePhoneNo, sendEmailOtp, verifyAndUpdateEmail } = useEmployerStore();
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    gstin: "",
  });

  // email/phone change flows
  const [emailChange, setEmailChange] = useState(false);
  const [emailNew, setEmailNew] = useState("");
  const [emailOtp, setEmailOtp] = useState("");
  const [emailOtpSent, setEmailOtpSent] = useState(false);
  const [emailMessage, setEmailMessage] = useState("");

  const [phoneChange, setPhoneChange] = useState(false);
  const [phoneNew, setPhoneNew] = useState("");
  const [phoneOtp, setPhoneOtp] = useState("");
  const [phoneOtpSent, setPhoneOtpSent] = useState(false);
  const [phoneMessage, setPhoneMessage] = useState("");

  // modal states for employer email/phone update (popup like employee flow)
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [modalEmailNew, setModalEmailNew] = useState("");
  const [modalEmailOtp, setModalEmailOtp] = useState("");
  const [modalEmailOtpSent, setModalEmailOtpSent] = useState(false);
  const [modalEmailMessage, setModalEmailMessage] = useState("");
  const [modalEmailLoading, setModalEmailLoading] = useState(false);

  const [showPhoneModal, setShowPhoneModal] = useState(false);
  const [modalPhoneNew, setModalPhoneNew] = useState("");
  const [modalPhoneOtp, setModalPhoneOtp] = useState("");
  const [modalPhoneOtpSent, setModalPhoneOtpSent] = useState(false);
  const [modalPhoneMessage, setModalPhoneMessage] = useState("");
  const [modalPhoneLoading, setModalPhoneLoading] = useState(false);

  useEffect(() => {
    getEmployer().catch(() => {});
  }, [getEmployer]);

  // Initialize form data when employer data loads
  useEffect(() => {
    if (employer) {
      setFormData({
        name: employer.name ?? "",
        email: employer.email ?? "",
        phone: employer.phone ?? "",
        gstin: employer.gstin ?? "",
      });
      setEmailNew(employer.email ?? "");
      setPhoneNew(employer.phone ?? "");
    }
  }, [employer]);

  const fullName = employer?.name ?? "NA";
  const email = employer?.email ?? "NA";
  const mobile = employer?.phone ?? "NA";
  const emailVerified = employer?.email_verified ?? false;
  const phoneVerified = employer?.phone_verified ?? false;
  const gstin = employer?.gstin ?? "NA";

  const handleSave = async () => {
    try {
      await updateEmployerProfile({
        name: formData.name,
        email: formData.email,
        gstin: formData.gstin || null,
        employer_type: employer?.employer_type ?? "company",
      });
      await getEmployer();
      setEditing(false);
    } catch (error) {
      console.error("Failed to update employer profile", error);
    }
  };

  const handleCancel = () => {
    // Reset form data to original values
    setFormData({
      name: employer?.name ?? "",
      email: employer?.email ?? "",
      phone: employer?.phone ?? "",
      gstin: employer?.gstin ?? "",
    });
    setEditing(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Show full-page loading only when initial employer data is not available
  if (isLoading && !employer) {
    return (
      <div className="p-6">
        Loading...
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-2xl rounded-xl border border-slate-200 bg-white">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <h1 className="text-xl font-bold text-slate-900">Profile</h1>
          <div className="flex gap-2">
            {editing ? (
              <>
                <button
                  type="button"
                  onClick={handleSave}
                  className="rounded-lg bg-gradient-primary px-4 py-2 text-sm font-semibold text-white hover:opacity-90 transition-opacity"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => setEditing(true)}
                className="rounded-lg bg-gradient-primary px-4 py-2 text-sm font-semibold text-white hover:opacity-90 transition-opacity"
              >
                Edit
              </button>
            )}
          </div>
        </div>

        <div className="space-y-6 p-6">
          <div>
            <h2 className="mb-4 text-sm font-semibold text-slate-700">Basic details</h2>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-500">Full name</label>
                <input
                  type="text"
                  name="name"
                  readOnly={!editing}
                  value={formData.name}
                  onChange={handleInputChange}
                  className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none read-only:bg-slate-50"
                />
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-slate-500">Official email ID</label>
                  {!emailVerified && (
                    <span className="text-xs font-semibold text-amber-600">Not Verified</span>
                  )}
                </div>
                <div className="mt-1 flex gap-2 items-center">
                  <input
                    type="email"
                    name="email"
                    readOnly={!editing || emailVerified}
                    value={formData.email}
                    onChange={handleInputChange}
                    className="flex-1 rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none"
                  />

                  {emailVerified ? (
                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-emerald-100 text-emerald-700 px-3 py-1 text-xs font-semibold">Verified</span>
                      <button
                        type="button"
                        onClick={() => {
                          setModalEmailNew(formData.email || "");
                          setModalEmailOtp("");
                          setModalEmailOtpSent(false);
                          setModalEmailMessage("");
                          setShowEmailModal(true);
                        }}
                        className="rounded-lg border border-slate-200 px-3 py-1 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                      >
                        Change
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        setModalEmailNew(formData.email || "");
                        setModalEmailOtp("");
                        setModalEmailOtpSent(false);
                        setModalEmailMessage("");
                        setShowEmailModal(true);
                      }}
                      className="rounded-lg bg-amber-50 text-amber-700 border border-amber-100 px-3 py-1 text-sm font-semibold"
                    >
                      Verify
                    </button>
                  )}
                </div>

                {emailChange && (
                  <div className="mt-2 space-y-2">
                    <div className="flex gap-2">
                      <input
                        type="email"
                        value={emailNew}
                        onChange={(e) => setEmailNew(e.target.value)}
                        className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm"
                        placeholder="Enter new email"
                      />
                      <button
                        type="button"
                        onClick={async () => {
                          try {
                            await sendEmailOtp(emailNew);
                            setEmailOtpSent(true);
                            setEmailMessage('OTP sent to ' + emailNew);
                          } catch (er) {
                            setEmailMessage('Failed to send OTP');
                          }
                        }}
                        className="rounded-lg bg-gradient-primary px-3 py-2 text-sm font-semibold text-white"
                      >
                        Send OTP
                      </button>
                    </div>
                    {emailOtpSent && (
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={emailOtp}
                          onChange={(e) => setEmailOtp(e.target.value)}
                          placeholder="Enter OTP"
                          className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm"
                        />
                        <button
                          type="button"
                          onClick={async () => {
                            try {
                              await verifyAndUpdateEmail(emailNew, emailOtp);
                              setEmailMessage('Email updated');
                              setEmailChange(false);
                              setEmailOtp('');
                              setEmailOtpSent(false);
                              await getEmployer();
                            } catch (er) {
                              setEmailMessage('Failed to verify OTP');
                            }
                          }}
                          className="rounded-lg bg-gradient-primary px-3 py-2 text-sm font-semibold text-white"
                        >
                          Verify & Update
                        </button>
                      </div>
                    )}
                    {emailMessage && <p className="text-xs text-slate-600">{emailMessage}</p>}
                  </div>
                )}
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500">Mobile</label>
                <div className="mt-1 flex items-center gap-2">
                  <input
                    type="tel"
                    name="phone"
                    readOnly={!editing || phoneVerified}
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="flex-1 rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none"
                  />

                  {phoneVerified ? (
                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-emerald-100 text-emerald-700 px-3 py-1 text-xs font-semibold">Verified</span>
                      <button
                        type="button"
                       onClick={() => {
                         setModalPhoneNew(formData.phone || "");
                         setModalPhoneOtp("");
                         setModalPhoneOtpSent(false);
                         setModalPhoneMessage("");
                         setShowPhoneModal(true);
                       }}
                       className="rounded-lg border border-slate-200 px-3 py-1 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                      >
                       Change
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        setModalPhoneNew(formData.phone || "");
                        setModalPhoneOtp("");
                        setModalPhoneOtpSent(false);
                        setModalPhoneMessage("");
                        setShowPhoneModal(true);
                      }}
                      className="rounded-lg bg-amber-50 text-amber-700 border border-amber-100 px-3 py-1 text-sm font-semibold"
                    >
                      Verify
                    </button>
                  )}
                </div>

                {phoneChange && (
                  <div className="mt-2 space-y-2">
                    <div className="flex gap-2">
                      <input
                        type="tel"
                        value={phoneNew}
                        onChange={(e) => setPhoneNew(e.target.value.replace(/\D/g, ''))}
                        className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm"
                        placeholder="Enter new 10-digit mobile"
                      />
                      <button
                        type="button"
                        onClick={async () => {
                          try {
                            await sendPhoneUpdateOtp(phoneNew);
                            setPhoneOtpSent(true);
                            setPhoneMessage('OTP sent to ' + phoneNew);
                          } catch (er) {
                            setPhoneMessage('Failed to send OTP');
                          }
                        }}
                        className="rounded-lg bg-gradient-primary px-3 py-2 text-sm font-semibold text-white"
                      >
                        Send OTP
                      </button>
                    </div>
                    {phoneOtpSent && (
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={phoneOtp}
                          onChange={(e) => setPhoneOtp(e.target.value)}
                          placeholder="Enter OTP"
                          className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm"
                        />
                        <button
                          type="button"
                          onClick={async () => {
                            try {
                              await updatePhoneNo(phoneNew, phoneOtp);
                              setPhoneMessage('Phone updated');
                              setPhoneChange(false);
                              setPhoneOtp('');
                              setPhoneOtpSent(false);
                              await getEmployer();
                            } catch (er) {
                              setPhoneMessage('Failed to verify OTP');
                            }
                          }}
                          className="rounded-lg bg-gradient-primary px-3 py-2 text-sm font-semibold text-white"
                        >
                          Verify & Update
                        </button>
                      </div>
                    )}
                    {phoneMessage && <p className="text-xs text-slate-600">{phoneMessage}</p>}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div>
            <h2 className="mb-4 text-sm font-semibold text-slate-700">GST / ISD-GST Details</h2>
            <div className="flex gap-2">
              <input
                type="text"
                name="gstin"
                readOnly={!editing}
                placeholder="Enter GST / ISD-GST No."
                value={formData.gstin}
                onChange={handleInputChange}
                className="flex-1 rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none"
              />
              <button
                type="button"
                disabled={!editing}
                className="rounded-lg border border-slate-200 px-4 py-2 text-sm text-slate-400 disabled:opacity-50"
              >
                Verify
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Email update modal */}
      {showEmailModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-lg bg-white p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Update official email</h3>
              <button
                type="button"
                onClick={() => {
                  setShowEmailModal(false);
                  setModalEmailOtp("");
                  setModalEmailOtpSent(false);
                  setModalEmailMessage("");
                }}
                className="text-slate-500 hover:text-slate-700"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              {!modalEmailOtpSent ? (
                <>
                  <input
                    type="email"
                    value={modalEmailNew}
                    onChange={(e) => setModalEmailNew(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                    placeholder="Enter new email"
                  />
                  {modalEmailNew === formData.email && (
                    <p className="text-xs text-amber-600">Entered email is same as current email</p>
                  )}
                  <div className="flex justify-end">
                  <button
                    type="button"
                    disabled={!modalEmailNew || modalEmailLoading || modalEmailNew === formData.email}
                    onClick={async () => {
                      setModalEmailLoading(true);
                      try {
                        await sendEmailOtp(modalEmailNew);
                        setModalEmailOtpSent(true);
                        setModalEmailMessage('OTP sent to ' + modalEmailNew);
                      } catch (er) {
                        setModalEmailMessage('Failed to send OTP');
                      } finally {
                        setModalEmailLoading(false);
                      }
                    }}
                    className="rounded-lg bg-gradient-primary px-3 py-2 text-sm font-semibold text-white"
                  >
                    Send OTP
                  </button>
                  </div>
                </>
              ) : (
                <>
                  <p className="text-sm text-slate-600">OTP sent to {modalEmailNew}</p>
                  <input
                    type="text"
                    value={modalEmailOtp}
                    onChange={(e) => setModalEmailOtp(e.target.value)}
                    placeholder="Enter OTP"
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setModalEmailOtpSent(false);
                        setModalEmailOtp("");
                        setModalEmailMessage("");
                      }}
                      className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={async () => {
                        setModalEmailLoading(true);
                        try {
                          await verifyAndUpdateEmail(modalEmailNew, modalEmailOtp);
                          setShowEmailModal(false);
                          setModalEmailOtp("");
                          setModalEmailOtpSent(false);
                          setModalEmailMessage("");
                          await getEmployer();
                        } catch (er) {
                          setModalEmailMessage('Failed to verify OTP');
                        } finally {
                          setModalEmailLoading(false);
                        }
                      }}
                      className="rounded-lg bg-gradient-primary px-3 py-2 text-sm font-semibold text-white"
                    >
                      Verify & Update
                    </button>
                  </div>
                </>
              )}

              {modalEmailMessage && <p className="text-xs text-slate-600">{modalEmailMessage}</p>}
            </div>
          </div>
        </div>
      )}

      {/* Phone update modal */}
      {showPhoneModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-lg bg-white p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Update mobile number</h3>
              <button
                type="button"
                onClick={() => {
                  setShowPhoneModal(false);
                  setModalPhoneOtp("");
                  setModalPhoneOtpSent(false);
                  setModalPhoneMessage("");
                }}
                className="text-slate-500 hover:text-slate-700"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              {!modalPhoneOtpSent ? (
                <>
                  <input
                    type="tel"
                    value={modalPhoneNew}
                    onChange={(e) => setModalPhoneNew(e.target.value.replace(/\D/g, ''))}
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                    placeholder="Enter new 10-digit mobile"
                  />
                  {modalPhoneNew === formData.phone && (
                    <p className="text-xs text-amber-600">Entered number is same as current mobile</p>
                  )}
                  <div className="flex justify-end">
                  <button
                    type="button"
                    disabled={modalPhoneNew.length < 10 || modalPhoneLoading || modalPhoneNew === formData.phone}
                    onClick={async () => {
                      setModalPhoneLoading(true);
                      try {
                        await sendPhoneUpdateOtp(modalPhoneNew);
                        setModalPhoneOtpSent(true);
                        setModalPhoneMessage('OTP sent to ' + modalPhoneNew);
                      } catch (er) {
                        setModalPhoneMessage('Failed to send OTP');
                      } finally {
                        setModalPhoneLoading(false);
                      }
                    }}
                    className="rounded-lg bg-gradient-primary px-3 py-2 text-sm font-semibold text-white"
                  >
                    Send OTP
                  </button>
                  </div>
                </>
              ) : (
                <>
                  <p className="text-sm text-slate-600">OTP sent to {modalPhoneNew}</p>
                  <input
                    type="text"
                    value={modalPhoneOtp}
                    onChange={(e) => setModalPhoneOtp(e.target.value)}
                    placeholder="Enter OTP"
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setModalPhoneOtpSent(false);
                        setModalPhoneOtp("");
                        setModalPhoneMessage("");
                      }}
                      className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={async () => {
                        setModalPhoneLoading(true);
                        try {
                          await updatePhoneNo(modalPhoneNew, modalPhoneOtp);
                          setShowPhoneModal(false);
                          setModalPhoneOtp("");
                          setModalPhoneOtpSent(false);
                          setModalPhoneMessage("");
                          await getEmployer();
                        } catch (er) {
                          setModalPhoneMessage('Failed to verify OTP');
                        } finally {
                          setModalPhoneLoading(false);
                        }
                      }}
                      className="rounded-lg bg-gradient-primary px-3 py-2 text-sm font-semibold text-white"
                    >
                      Verify & Update
                    </button>
                  </div>
                </>
              )}

              {modalPhoneMessage && <p className="text-xs text-slate-600">{modalPhoneMessage}</p>}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
