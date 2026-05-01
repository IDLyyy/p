import { useState, useEffect } from "react";
import { getParticipants, updateParticipantStatus, deleteParticipant, type Participant } from "@/lib/participants";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Search, Trash2, Users, CheckCircle2, Clock, XCircle, Lock, Download, RefreshCw, Crown, Star, Plus, Tag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { WEBINAR_CONFIG } from "@/config/webinar";
import { toast } from "sonner";

const statusConfig = {
  pending: { label: "Menunggu", icon: Clock, variant: "secondary" as const },
  verified: { label: "Terverifikasi", icon: CheckCircle2, variant: "default" as const },
  rejected: { label: "Ditolak", icon: XCircle, variant: "destructive" as const },
};

const AdminPage = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(() => sessionStorage.getItem("admin_auth") === "true");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"vip" | "regular">("vip");

  // Referral code management
  const [referralCodes, setReferralCodes] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem("referral_codes") || "[]");
    } catch {
      return [];
    }
  });
  const [newReferralCode, setNewReferralCode] = useState("");
  const [referralSearch, setReferralSearch] = useState("");
  const [showReferralPanel, setShowReferralPanel] = useState(false);

  const refresh = async () => {
    setLoading(true);
    const data = await getParticipants();
    setParticipants(data);
    setLoading(false);
  };

  useEffect(() => { if (isAuthenticated) refresh(); }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === WEBINAR_CONFIG.adminPassword) {
      setIsAuthenticated(true);
      sessionStorage.setItem("admin_auth", "true");
      setLoginError("");
    } else {
      setLoginError("Password salah");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("admin_auth");
  };

  const addReferralCode = () => {
    const code = newReferralCode.trim().toUpperCase();
    if (!code) return;
    if (referralCodes.includes(code)) {
      toast.error("Kode referral sudah ada");
      return;
    }
    const updated = [...referralCodes, code];
    setReferralCodes(updated);
    localStorage.setItem("referral_codes", JSON.stringify(updated));
    setNewReferralCode("");
    toast.success(`Kode referral "${code}" berhasil ditambahkan`);
  };

  const removeReferralCode = (code: string) => {
    const updated = referralCodes.filter((c) => c !== code);
    setReferralCodes(updated);
    localStorage.setItem("referral_codes", JSON.stringify(updated));
    toast.success(`Kode referral "${code}" berhasil dihapus`);
  };

  // Get participants who used a specific referral code
  const getParticipantsByReferral = (code: string) => {
    return participants.filter((p) => p.registrationData.referralCode?.toUpperCase() === code.toUpperCase());
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="bg-card rounded-2xl shadow-elevated p-8 w-full max-w-sm animate-scale-in">
          <div className="flex flex-col items-center mb-6">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-3">
              <Lock className="h-7 w-7 text-primary" />
            </div>
            <h1 className="text-xl font-bold text-foreground">Idaroh Login</h1>
            <p className="text-sm text-muted-foreground">Masukkan password untuk mengakses panel idaroh</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="admin-password">Password</Label>
              <Input
                id="admin-password"
                type="password"
                placeholder="Masukkan password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setLoginError(""); }}
              />
              {loginError && <p className="text-sm text-destructive">{loginError}</p>}
            </div>
            <Button type="submit" variant="cta" className="w-full rounded-xl py-5">
              Masuk
            </Button>
          </form>
          <Button variant="ghost" className="w-full mt-3 text-sm" onClick={() => navigate("/")}>
            Kembali ke Beranda
          </Button>
        </div>
      </div>
    );
  }

  // Filter by ticket type (tab)
  const tabParticipants = participants.filter(
    (p) => (p.registrationData.ticketType || "regular") === activeTab
  );

  const filtered = tabParticipants.filter((p) => {
    const matchSearch =
      p.registrationData.fullName.toLowerCase().includes(search.toLowerCase()) ||
      p.registrationData.email.toLowerCase().includes(search.toLowerCase()) ||
      p.registrationData.phone.includes(search) ||
      (p.registrationData.referralCode || "").toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "all" || p.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const handleStatusChange = async (id: string, status: Participant["status"]) => {
    await updateParticipantStatus(id, status);
    toast.success("Status berhasil diubah");
    refresh();
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Yakin ingin menghapus peserta ini?")) {
      await deleteParticipant(id);
      toast.success("Peserta berhasil dihapus");
      refresh();
    }
  };

  const vipCount = participants.filter((p) => (p.registrationData.ticketType || "regular") === "vip").length;
  const regCount = participants.filter((p) => (p.registrationData.ticketType || "regular") === "regular").length;

  const stats = {
    total: tabParticipants.length,
    pending: tabParticipants.filter((p) => p.status === "pending").length,
    verified: tabParticipants.filter((p) => p.status === "verified").length,
    rejected: tabParticipants.filter((p) => p.status === "rejected").length,
  };

  const exportCSV = () => {
    const headers = ["Nama", "Email", "WhatsApp", "Profesi", "Latar Belakang", "Paket", "Kode Referral", "Order ID", "Status Bayar", "Jumlah", "Tanggal Daftar", "Status"];
    const rows = tabParticipants.map((p) => [
      p.registrationData.fullName,
      p.registrationData.email,
      p.registrationData.phone,
      p.registrationData.profession,
      p.registrationData.background,
      p.registrationData.ticketType || "regular",
      p.registrationData.referralCode || "",
      p.proofFileName,
      p.paymentStatus || "",
      p.amount || "",
      new Date(p.registeredAt).toLocaleString("id-ID"),
      statusConfig[p.status].label,
    ]);
    const csv = [headers, ...rows].map((r) => r.map((c) => `"${(String(c || "")).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `peserta-${activeTab}-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("File CSV berhasil diunduh");
  };

  // Referral search results
  const referralSearchResults = referralSearch
    ? participants.filter((p) =>
        (p.registrationData.referralCode || "").toUpperCase().includes(referralSearch.toUpperCase())
      )
    : [];

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8 max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">Panel Idaroh</h1>
              <p className="text-muted-foreground text-sm">Kelola pendaftaran peserta webinar</p>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Button variant="outline" size="sm" onClick={() => setShowReferralPanel(!showReferralPanel)}>
              <Tag className="h-4 w-4 mr-1" />
              Referral
            </Button>
            <Button variant="outline" size="sm" onClick={refresh} disabled={loading}>
              <RefreshCw className={`h-4 w-4 mr-1 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </Button>
            <Button variant="outline" size="sm" onClick={exportCSV} disabled={tabParticipants.length === 0}>
              <Download className="h-4 w-4 mr-1" />
              Export CSV
            </Button>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>

        {/* Referral Code Management Panel */}
        {showReferralPanel && (
          <div className="bg-card rounded-xl shadow-card p-6 mb-8 space-y-4">
            <h3 className="font-bold text-foreground flex items-center gap-2">
              <Tag className="h-5 w-5 text-primary" />
              Manajemen Kode Referral
            </h3>

            {/* Add referral */}
            <div className="flex gap-2">
              <Input
                placeholder="Masukkan kode referral baru..."
                value={newReferralCode}
                onChange={(e) => setNewReferralCode(e.target.value.toUpperCase())}
                onKeyDown={(e) => { if (e.key === "Enter") addReferralCode(); }}
                className="flex-1"
              />
              <Button onClick={addReferralCode} size="sm">
                <Plus className="h-4 w-4 mr-1" />
                Tambah
              </Button>
            </div>

            {/* Existing codes */}
            {referralCodes.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {referralCodes.map((code) => {
                  const count = getParticipantsByReferral(code).length;
                  return (
                    <div key={code} className="flex items-center gap-1 bg-secondary px-3 py-1.5 rounded-full">
                      <span className="text-sm font-medium text-foreground">{code}</span>
                      <Badge variant="secondary" className="text-xs">{count} orang</Badge>
                      <button
                        onClick={() => removeReferralCode(code)}
                        className="ml-1 text-muted-foreground hover:text-destructive transition-colors"
                      >
                        <XCircle className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Search by referral */}
            <div className="space-y-2">
              <Label className="text-sm text-muted-foreground">Cari peserta berdasarkan kode referral</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Ketik kode referral..."
                  value={referralSearch}
                  onChange={(e) => setReferralSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
              {referralSearch && (
                <div className="rounded-lg border border-border p-3 space-y-2 max-h-60 overflow-y-auto">
                  {referralSearchResults.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-2">Tidak ada peserta dengan kode referral ini</p>
                  ) : (
                    referralSearchResults.map((p) => (
                      <div key={p.id} className="flex items-center justify-between text-sm py-1 border-b border-border last:border-0">
                        <div>
                          <p className="font-medium text-foreground">{p.registrationData.fullName}</p>
                          <p className="text-xs text-muted-foreground">{p.registrationData.email} • {p.registrationData.ticketType?.toUpperCase()}</p>
                        </div>
                        <Badge variant="secondary" className="text-xs">{p.registrationData.referralCode}</Badge>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* VIP / Regular Tabs */}
        <div className="flex gap-2 mb-6">
          <Button
            variant={activeTab === "vip" ? "default" : "outline"}
            onClick={() => setActiveTab("vip")}
            className={`gap-2 ${activeTab === "vip" ? "bg-gradient-to-r from-yellow-500 to-amber-600 text-black hover:from-yellow-400 hover:to-amber-500" : ""}`}
          >
            <Crown className="h-4 w-4" />
            VIP ({vipCount})
          </Button>
          <Button
            variant={activeTab === "regular" ? "default" : "outline"}
            onClick={() => setActiveTab("regular")}
            className="gap-2"
          >
            <Star className="h-4 w-4" />
            Reguler ({regCount})
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Peserta", value: stats.total, icon: Users, color: "text-foreground" },
            { label: "Menunggu", value: stats.pending, icon: Clock, color: "text-accent" },
            { label: "Terverifikasi", value: stats.verified, icon: CheckCircle2, color: "text-primary" },
            { label: "Ditolak", value: stats.rejected, icon: XCircle, color: "text-destructive" },
          ].map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="bg-card rounded-xl shadow-card p-4">
              <div className="flex items-center gap-2 mb-1">
                <Icon className={`h-4 w-4 ${color}`} />
                <span className="text-xs text-muted-foreground">{label}</span>
              </div>
              <p className={`text-2xl font-bold ${color}`}>{value}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Cari nama, email, nomor HP, atau kode referral..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Status</SelectItem>
              <SelectItem value="pending">Menunggu</SelectItem>
              <SelectItem value="verified">Terverifikasi</SelectItem>
              <SelectItem value="rejected">Ditolak</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        {loading ? (
          <div className="bg-card rounded-xl shadow-card p-12 text-center">
            <RefreshCw className="h-8 w-8 text-muted-foreground mx-auto mb-3 animate-spin" />
            <p className="text-muted-foreground">Memuat data peserta...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="bg-card rounded-xl shadow-card p-12 text-center">
            <Users className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">
              {tabParticipants.length === 0 ? `Belum ada peserta ${activeTab.toUpperCase()} yang terdaftar` : "Tidak ada hasil yang sesuai filter"}
            </p>
          </div>
        ) : (
          <div className="bg-card rounded-xl shadow-card overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nama</TableHead>
                    <TableHead className="hidden md:table-cell">Email</TableHead>
                    <TableHead className="hidden sm:table-cell">WhatsApp</TableHead>
                    <TableHead className="hidden lg:table-cell">Profesi</TableHead>
                    <TableHead className="hidden xl:table-cell">Keterangan</TableHead>
                    <TableHead className="hidden lg:table-cell">Referral</TableHead>
                    <TableHead className="hidden lg:table-cell">Jam Daftar</TableHead>
                    <TableHead className="hidden lg:table-cell">Bayar</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((p) => {
                    const sc = statusConfig[p.status];
                    return (
                      <TableRow key={p.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium text-foreground">{p.registrationData.fullName}</p>
                            <p className="text-xs text-muted-foreground md:hidden">{p.registrationData.email}</p>
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell text-sm">{p.registrationData.email}</TableCell>
                        <TableCell className="hidden sm:table-cell text-sm">{p.registrationData.phone}</TableCell>
                        <TableCell className="hidden lg:table-cell text-sm">
                          {p.registrationData.profession}
                        </TableCell>
                        <TableCell className="hidden xl:table-cell text-sm max-w-[200px]">
                          <p className="truncate text-muted-foreground" title={p.registrationData.background}>
                            {p.registrationData.background}
                          </p>
                        </TableCell>
                        <TableCell className="hidden lg:table-cell text-sm">
                          {p.registrationData.referralCode ? (
                            <Badge variant="secondary" className="text-xs">{p.registrationData.referralCode}</Badge>
                          ) : (
                            <span className="text-muted-foreground text-xs">—</span>
                          )}
                        </TableCell>
                        <TableCell className="hidden lg:table-cell text-sm text-muted-foreground whitespace-nowrap">
                          {new Date(p.registeredAt).toLocaleString("id-ID", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                            timeZone: "Asia/Jakarta",
                          })}
                        </TableCell>
                        <TableCell className="hidden lg:table-cell text-sm">
                          <Badge variant={p.paymentStatus === "PAID" ? "default" : "secondary"} className="text-xs">
                            {p.paymentStatus || "N/A"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={sc.variant} className="gap-1 text-xs">
                            <sc.icon className="h-3 w-3" />
                            {sc.label}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-1">
                            <Select
                              value={p.status}
                              onValueChange={(v) => handleStatusChange(p.id, v as Participant["status"])}
                            >
                              <SelectTrigger className="h-8 w-28 text-xs">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pending">Menunggu</SelectItem>
                                <SelectItem value="verified">Verifikasi</SelectItem>
                                <SelectItem value="rejected">Tolak</SelectItem>
                              </SelectContent>
                            </Select>
                            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleDelete(p.id)}>
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
