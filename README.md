## 서비스명 : 모티 (모임 티켓)
## URL: https://meeti-ticket-flow.lovable.app/

## 서비스 목적

“티켓처럼 한눈에, 간편하게 모임을 정리하고 공유하세요.”

간단한 약속부터 중요한 모임까지, 필요한 정보를 담은 티켓을 빠르게 생성하고 공유할 수 있습니다.
모임 시간, 장소, 참석자 등을 직관적인 티켓 형태로 정리해 공유하면,
복잡한 설명 없이도 한눈에 내용을 이해할 수 있습니다.

티켓을 통해:
	•	모호한 약속 시간과 장소를 명확하게 정리하고
	•	불필요한 단체 카톡방 없이도 약속을 조율하며
	•	지난 모임들의 이력을 깔끔하게 모아볼 수 있습니다.

티켓 하나로, 모임의 시작과 끝을 정리하세요.

약속 장소, 및 약속 시간을 빠르게 정해서 공유하고, 불필요한 모임의 카톡방을 만들지 않아도 됩니다.

## 🎯 페르소나: 모임 총무형 사용자 – 정민우 (24세)

| 항목 | 내용 |
|------|------|
| **직업/역할** | 대학교 4학년 / 밴드 동아리 총무 |
| **라이프스타일** | 수업과 동아리 활동 병행. 주 1~2회 회식 또는 소모임을 주관하며, 모임 일정 조율과 공지 전달을 도맡음 |
| **목표** | 빠르게 모임을 만들고, 참여 인원 관리 및 공지를 효율적으로 공유하는 것 |
| **니즈** | “오냐/안 오냐”를 일일이 묻지 않고, 보기 쉬운 형식으로 모임 내용을 공유하고 참석 여부를 자동으로 정리하고 싶음 |
| **페인 포인트** | 카톡방 공지 무시, 참석자 명단 혼란, 당일이 되어서야 참석자 파악, 반복되는 공지 작성의 번거로움 |

---

## 📌 사용자 시나리오 및 스토리

**상황**  
동아리 공연이 끝난 후, 정민우는 뒷풀이 모임을 열고 참석자 정보를 수집해야 한다.

**사용자 시나리오**

1. 스마트폰으로 웹 서비스에 접속  
2. `[모임 티켓 만들기]` 클릭  
3. 모임 정보 입력:  
   - 이름: 공연 뒷풀이  
   - 장소: 홍대 ○○포차  
   - 날짜/시간 설정  
   - 공지: “선배님들 먼저 오시면 자리 맡아주세요!”  
4. QR 코드 자동 생성 및 카톡방에 공유  
5. 참여자들이 QR 찍고 ‘입장’ 버튼 클릭  
6. 참석자 명단이 티켓 화면에 자동 표시됨  
7. 모임 종료 후, 해당 티켓은 기록으로 저장되어 다시 열람 가능

**사용자 스토리**

> "매번 모임 때마다 누가 오고 안 오는지 확인하느라 정신 없어요.  
> 이건 그냥 QR만 공유하면 사람들이 참석 여부를 스스로 눌러주고,  
> 실시간으로 누가 올지 정리돼서 너무 간편하고 깔끔해요.  
> 나중에 지난 모임들을 돌아보는 것도 뭔가 ‘기록’ 느낌이라 좋고요."

---

## ✅ 인수 조건 (Acceptance Criteria)

- **Given**: 사용자가 모임 티켓을 만들고 QR을 공유했을 때  
- **When**: 참여자가 QR을 통해 ‘입장’ 버튼을 클릭했을 때  
- **Then**:  
  - 티켓에 참석자 이름이 자동으로 표시됨  
  - 모임 종료 후에도 해당 티켓 기록이 저장되어 열람 가능함  

---

## 🎯 핵심 가치 제안

| 항목 | 설명 |
|------|------|
| 🎟 **티켓형 UX** | ‘모임 티켓’이라는 익숙한 형식을 활용하여 정보 전달과 인원 파악을 단순화 |
| 📲 **모바일 최적화** | QR 기반 공유 + 모바일 카드 UI → 대학생 중심의 활동 스타일에 최적 |
| 📚 **모임 기록 저장** | 참석자 목록, 공지사항 등을 아카이브하여 모임이 ‘기억’으로 남도록 함 |

---

## ⚙ 핵심 기능 요약

- ✅ **모임 티켓 생성** (이름, 시간, 장소, 공지 포함)  
- ✅ **QR 코드 기반 티켓 공유**  
- ✅ **참여자 입장 기능 + 자동 참석자 명단 갱신**  
- ✅ **모임 종료 후 티켓 기록 보관 및 열람 기능**
