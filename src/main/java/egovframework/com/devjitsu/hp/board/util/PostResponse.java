package egovframework.com.devjitsu.hp.board.util;

import java.time.LocalDateTime;

public class PostResponse {


    private Long BOARD_ARTICLE_ID;                       // PK
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

    public Long getBOARD_ARTICLE_ID() {
        return BOARD_ARTICLE_ID;
    }

    public String getBOARD_ARTICLE_TITLE() {
        return BOARD_ARTICLE_TITLE;
    }
    public String getBOARD_ARTICLE_CONTENT() { return BOARD_ARTICLE_CONTENT; }

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
}