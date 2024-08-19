package egovframework.com.devjitsu.hp.board.util;

import java.time.LocalDateTime;

public class PostResponse {
    private String BOARD_NAME;
    /** 제안제도 */
    private Long SUGGESTION_BOARD_ID;
    private String SUGGESTION_DATE;
    private String SUGGESTION_TYPE;
    private String SUGGESTION_TYPE_TXT;
    private String SUGGESTION_TITLE;
    private String SUGGESTION_CONTENT1;
    private String SUGGESTION_CONTENT2;
    private String SUGGESTION_CONTENT3;
    private String EXECUTE;
    private String STATUS;
    private String EXECUTE_EMP_SEQ;
    private String EXECUTE_EMP_NAME;
    /** 제안제도 종료 */

    /** 요청 게시판 */
    private Long REQUEST_BOARD_ID;
    private String REQUEST_TYPE;
    private String REQUEST_TITLE;
    private String REQUEST_CONTENT;
    private String AF_STATUS;
    private String largeMenu;
    private String smallMenu;
    /** 요청 게시판 종료 */

    private Long WATCH_BOARD_ID;

    private Long BOARD_ARTICLE_ID;                       // PK
    private String BOARD_ID;
    private String BOARD_ARTICLE_TITLE;                  // 제목
    private String REG_EMP_NAME;                 // 작성자
    private String BOARD_ARTICLE_CONTENT;                 // 작성 내용
    private int BOARD_ARTICLE_VIEW_COUNT;                   // 조회 수
    private String PUBLIC_YN;              // 공개유무
    private String FILE_YN;              // 파일유무
    private LocalDateTime REG_DATE;     // 생성일시
    private String BOARD_ARTICLE_GROUP;    // 게시글 그룹

    private String EMP_SEQ;    // 작성자 사원번호

    private String FILE_PATH;
    private String FILE_UUID;
    private String FILE_ORG_NAME;

    private String BOARD_ARTICLE_CONTENT_URL;
    private String BOARD_ARTICLE_HASHTAG;
    private String STATE;

    /*뉴스레터 구독현황*/
    private String APPLICANT;
    private String EMAIL;
    private String BELONG;
    private String CONFIRM1;
    private String CONFIRM2;
    private LocalDateTime APPLY_DATE;
    private LocalDateTime CANCLE_DATE;

    private String REPLY_CNT;
    private String SNS_TYPE;

    /*캠-인크루트 > 채용공고 */
    private String RECRUIT_INFO_SN;
    private String RECRUIT_TITLE;
    private String REG_DT;
    private String START_DT;
    private String END_DT;
    private String RECRUIT_STATUS_TEXT;
    private String RECRUIT_STATUS_SN;
    private int RECRUIT_VIEW_COUNT;

    /*캠스팟 > 일정 */
    private String title;
    private String SCHEDULE_CONTENT;
    private String SCHEDULE_PLACE;
    private String SCHEDULE_TYPE;
    private String start;
    private String end;
    private String HR_BIZ_REQ_ID;
    private String DEPT_NAME;

    public String getDEPT_NAME() {
        return DEPT_NAME;
    }

    public String getHR_BIZ_REQ_ID() {
        return HR_BIZ_REQ_ID;
    }

    public String getBOARD_NAME() {
        return BOARD_NAME;
    }

    public String getREPLY_CNT() {
        return REPLY_CNT;
    }

    public Long getWATCH_BOARD_ID() {
        return WATCH_BOARD_ID;
    }

    public Long getREQUEST_BOARD_ID() {
        return REQUEST_BOARD_ID;
    }

    public String getREQUEST_TYPE() {
        return REQUEST_TYPE;
    }

    public String getREQUEST_TITLE() {
        return REQUEST_TITLE;
    }

    public String getREQUEST_CONTENT() {
        return REQUEST_CONTENT;
    }

    public Long getSUGGESTION_BOARD_ID() {
        return SUGGESTION_BOARD_ID;
    }

    public String getSUGGESTION_DATE() {
        return SUGGESTION_DATE;
    }

    public String getSUGGESTION_TYPE() {
        return SUGGESTION_TYPE;
    }

    public String getSUGGESTION_TYPE_TXT() {
        return SUGGESTION_TYPE_TXT;
    }

    public String getSUGGESTION_TITLE() {
        return SUGGESTION_TITLE;
    }

    public String getSUGGESTION_CONTENT1() {
        return SUGGESTION_CONTENT1;
    }

    public String getSUGGESTION_CONTENT2() {
        return SUGGESTION_CONTENT2;
    }

    public String getSUGGESTION_CONTENT3() {
        return SUGGESTION_CONTENT3;
    }

    public String getEXECUTE() {
        return EXECUTE;
    }

    public String getSTATUS() {
        return STATUS;
    }

    public String getEXECUTE_EMP_SEQ() {
        return EXECUTE_EMP_SEQ;
    }

    public String getEXECUTE_EMP_NAME() {
        return EXECUTE_EMP_NAME;
    }

    public Long getBOARD_ARTICLE_ID() {
        return BOARD_ARTICLE_ID;
    }

    public String getBOARD_ID() {
        return BOARD_ID;
    }
    public String getBOARD_ARTICLE_TITLE() {
        return BOARD_ARTICLE_TITLE;
    }
    public String getBOARD_ARTICLE_CONTENT() { return BOARD_ARTICLE_CONTENT; }

    public String getBOARD_ARTICLE_CONTENT_URL() { return BOARD_ARTICLE_CONTENT_URL; }
    public String getBOARD_ARTICLE_HASHTAG() { return BOARD_ARTICLE_HASHTAG; }

    public String getREG_EMP_NAME() {
        return REG_EMP_NAME;
    }

    public int getBOARD_ARTICLE_VIEW_COUNT() {
        return BOARD_ARTICLE_VIEW_COUNT;
    }

    public String getPUBLIC_YN() {
        return PUBLIC_YN;
    }

    public String getFILE_YN() {
        return FILE_YN;
    }

    public LocalDateTime getREG_DATE() {
        return REG_DATE;
    }

    public String getBOARD_ARTICLE_GROUP() {
        return BOARD_ARTICLE_GROUP;
    }

    public String getEMP_SEQ() {
        return EMP_SEQ;
    }

    public String getFIle_PATH() {
        return FILE_PATH;
    }
    public String getFILE_UUID() {
        return FILE_UUID;
    }
    public String getFILE_ORG_NAME() {
        return FILE_ORG_NAME;
    }
    public String getSTATE() { return STATE; }
    public String getAPPLICANT() { return APPLICANT; }
    public String getEMAIL() { return EMAIL; }
    public String getCONFIRM1() { return CONFIRM1; }
    public String getCONFIRM2() { return CONFIRM2; }
    public LocalDateTime getAPPLY_DATE() { return APPLY_DATE; }
    public LocalDateTime getCANCLE_DATE() { return CANCLE_DATE; }

    public String getRECRUIT_INFO_SN() { return RECRUIT_INFO_SN; }
    public String getRECRUIT_TITLE() { return RECRUIT_TITLE; }
    public String getREG_DT() { return REG_DT; }
    public String getSTART_DT() { return START_DT; }
    public String getEND_DT() { return END_DT; }
    public String getRECRUIT_STATUS_TEXT() { return RECRUIT_STATUS_TEXT; }
    public String getRECRUIT_STATUS_SN() { return RECRUIT_STATUS_SN; }
    public int getRECRUIT_VIEW_COUNT() {
        return RECRUIT_VIEW_COUNT;
    }

    public String getSNS_TYPE() { return SNS_TYPE; }


    public String getTitle() { return title; }
    public String getSCHEDULE_CONTENT() { return SCHEDULE_CONTENT; }
    public String getSCHEDULE_PLACE() { return SCHEDULE_PLACE; }
    public String getSCHEDULE_TYPE() { return SCHEDULE_TYPE; }
    public String getStart() { return start; }
    public String getEnd() { return end; }

    public String getAF_STATUS() {return AF_STATUS;}
    public void setAF_STATUS(String AF_STATUS) {this.AF_STATUS = AF_STATUS;}

    public String getSmallMenu() {
        return smallMenu;
    }

    public void setSmallMenu(String smallMenu) {
        this.smallMenu = smallMenu;
    }

    public String getLargeMenu() {
        return largeMenu;
    }

    public void setLargeMenu(String largeMenu) {
        this.largeMenu = largeMenu;
    }
}