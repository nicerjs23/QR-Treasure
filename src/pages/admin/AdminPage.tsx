// src/pages/admin/AdminPage.tsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@store/authStore";
import {
  isAdmin,
  createTeams,
  createUsers,
  createTreasures,
} from "@services/adminService";
//import { teamsData, usersData, treasuresData } from "@data/data";
import { teamsData, usersData, treasuresData } from "@data/examData";
import * as S from "./AdminPage.styled";

const AdminPage = () => {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isAdminChecked, setIsAdminChecked] = useState(false);

  // 관리자 권한 체크 (비동기 함수 사용)
  useEffect(() => {
    const checkAdminAccess = async () => {
      if (!user) {
        navigate("/", { replace: true });
        return;
      }

      try {
        const adminAccess = await isAdmin(user.id);
        if (!adminAccess) {
          navigate("/home", { replace: true });
        } else {
          setIsAdminChecked(true);
        }
      } catch (error) {
        console.error("관리자 권한 확인 오류:", error);
        navigate("/home", { replace: true });
      }
    };

    checkAdminAccess();
  }, [user, navigate]);

  // 팀 데이터 생성 처리
  const handleCreateTeams = async () => {
    setLoading(true);
    setMessage("팀 데이터 생성 중...");

    try {
      const count = await createTeams(teamsData as any);
      setMessage(`팀 데이터 생성 완료: ${count}개 성공`);
    } catch (error) {
      console.error("팀 생성 오류:", error);
      setMessage("팀 데이터 생성 중 오류 발생");
    } finally {
      setLoading(false);
    }
  };

  // 사용자 데이터 생성 처리
  const handleCreateUsers = async () => {
    setLoading(true);
    setMessage("사용자 데이터 생성 중...");

    try {
      const count = await createUsers(usersData as any);
      setMessage(`사용자 데이터 생성 완료: ${count}명 성공`);
    } catch (error) {
      console.error("사용자 생성 오류:", error);
      setMessage("사용자 데이터 생성 중 오류 발생");
    } finally {
      setLoading(false);
    }
  };

  // 보물 데이터 생성 처리
  const handleCreateTreasures = async () => {
    setLoading(true);
    setMessage("보물 데이터 생성 중...");

    try {
      const count = await createTreasures(treasuresData as any);
      setMessage(`보물 데이터 생성 완료: ${count}개 성공`);
    } catch (error) {
      console.error("보물 생성 오류:", error);
      setMessage("보물 데이터 생성 중 오류 발생");
    } finally {
      setLoading(false);
    }
  };

  // 로그아웃 처리
  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  if (!user || !isAdminChecked) return null;

  return (
    <S.AdminWrapper>
      <S.AdminTitle>QR 보물찾기 관리자 페이지</S.AdminTitle>
      <S.AdminInfo>
        로그인: <span>{user.username}</span>
      </S.AdminInfo>

      <S.ButtonGroup>
        <S.AdminButton onClick={handleCreateTeams} disabled={loading}>
          팀 데이터 생성
        </S.AdminButton>
        <S.AdminButton onClick={handleCreateUsers} disabled={loading}>
          사용자 데이터 생성
        </S.AdminButton>
        <S.AdminButton onClick={handleCreateTreasures} disabled={loading}>
          보물 데이터 생성
        </S.AdminButton>
      </S.ButtonGroup>

      {message && <S.StatusMessage>{message}</S.StatusMessage>}

      <S.AdminSection>
        <S.SectionTitle>사전 정의된 팀 (미리보기)</S.SectionTitle>
        <S.DataPreview>
          {teamsData.map((team: any) => (
            <S.DataItem key={team.teamId}>
              팀 {team.teamId} (초기 점수: {team.totalScore})
            </S.DataItem>
          ))}
        </S.DataPreview>
      </S.AdminSection>

      <S.AdminSection>
        <S.SectionTitle>사전 정의된 사용자 (미리보기)</S.SectionTitle>
        <S.DataPreview>
          {usersData.map((user: any, index: number) => (
            <S.DataItem key={index}>
              {user.username} (팀 {user.team}){user.isAdmin && " - 관리자"}
            </S.DataItem>
          ))}
        </S.DataPreview>
      </S.AdminSection>

      <S.AdminSection>
        <S.SectionTitle>사전 정의된 보물 (미리보기)</S.SectionTitle>
        <S.DataPreview>
          {treasuresData.map((treasure: any) => (
            <S.DataItem key={treasure.treasureKey}>
              {treasure.customId && ` [QR문서ID: ${treasure.customId}]`}#
              {treasure.treasureKey}: {treasure.description}
              {treasure.type === "SCORE" && ` (${treasure.score}점)`}
              {treasure.type === "PENALTY" && " (벌칙)"}
              {treasure.type === "PRIZE" && " (상품)"}
            </S.DataItem>
          ))}
        </S.DataPreview>
      </S.AdminSection>

      <S.AdminSection>
        <S.SectionTitle>QR 코드 생성 안내</S.SectionTitle>
        <S.DataPreview>
          <S.DataItem>
            1. 보물 데이터는 data.ts 파일에서 customId 필드로 문서 ID를 직접
            지정할 수 있습니다.
          </S.DataItem>
          <S.DataItem>
            2. QR 코드 URL은 /qr-redirect?id=문서ID 형식으로 생성됩니다.
          </S.DataItem>
        </S.DataPreview>
      </S.AdminSection>

      <S.LogoutButton onClick={handleLogout}>로그아웃</S.LogoutButton>
    </S.AdminWrapper>
  );
};

export default AdminPage;
