import { useState, useEffect } from "react";
import { getParticipants, updateParticipantStatus, deleteParticipant, type Participant } from "@/lib/participants";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Search, Trash2, Users, CheckCircle2, Clock, XCircle, Lock, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { WEBINAR_CONFIG } from "@/config/webinar";

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

  const refresh = () => setParticipants(getParticipants());

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

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="bg-card rounded-2xl shadow-elevated p-8 w-full max-w-sm animate-scale-in">
          <div className="flex flex-col items-center mb-6">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-3">
              <Lock className="h-7 w-7 text-primary" />
            </div>
            <h1 className="text-xl font-bold text-foreground">Admin Login</h1>
            <p className="text-sm text-muted-foreground">Masukkan password untuk mengakses panel admin</p>
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

  const filtered = participants.filter((p) => {
    const matchSearch =
      p.registrationData.fullName.toLowerCase().includes(search.toLowerCase()) ||
      p.registrationData.email.toLowerCase().includes(search.toLowerCase()) ||
      p.registrationData.phone.includes(search);
    const matchStatus = filterStatus === "all" || p.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const handleStatusChange = (id: string, status: Participant["status"]) => {
    updateParticipantStatus(id, status);
    refresh();
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Yakin ingin menghapus peserta ini?")) {
      deleteParticipant(id);
      refresh();
    }
  };

  const stats = {
    total: participants.length,
    pending: participants.filter((p) => p.status === "pending").length,
    verified: participants.filter((p) => p.status === "verified").length,
    rejected: participants.filter((p) => p.status === "rejected").length,
  };

  const exportCSV = () => {
    const headers = ["Nama", "Email", "WhatsApp", "Profesi", "Metode Pembayaran", "Bukti Bayar", "Tanggal Daftar", "Status"];
    const rows = participants.map((p) => [
      p.registrationData.fullName,
      p.registrationData.email,
      p.registrationData.phone,
      p.registrationData.profession,
      p.paymentMethod,
      p.proofFileName,
      new Date(p.registeredAt).toLocaleString("id-ID"),
      statusConfig[p.status].label,
    ]);
    const csv = [headers, ...rows].map((r) => r.map((c) => `"${(c || "").replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `peserta-webinar-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

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
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">Panel Admin</h1>
              <p className="text-muted-foreground text-sm">Kelola pendaftaran peserta webinar</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={exportCSV} disabled={participants.length === 0}>
              <Download className="h-4 w-4 mr-1" />
              Export CSV
            </Button>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              Logout
            </Button>
          </div>
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
              placeholder="Cari nama, email, atau nomor HP..."
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
        {filtered.length === 0 ? (
          <div className="bg-card rounded-xl shadow-card p-12 text-center">
            <Users className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">
              {participants.length === 0 ? "Belum ada peserta yang terdaftar" : "Tidak ada hasil yang sesuai filter"}
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
                    <TableHead className="hidden lg:table-cell">Pembayaran</TableHead>
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
                        <TableCell className="hidden lg:table-cell text-sm capitalize">{p.paymentMethod}</TableCell>
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
