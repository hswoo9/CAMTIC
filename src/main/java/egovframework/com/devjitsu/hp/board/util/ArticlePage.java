package egovframework.com.devjitsu.hp.board.util;

import egovframework.com.devjitsu.hp.board.util.Pagination;

public class ArticlePage {


    private String boardId;

    private String searchCategory;

    private String searchColumn;

    private String SearchContent;

    private String anonymousActive;

    private int page;             // 현재 페이지 번호
    private int recordSize;       // 페이지당 출력할 데이터 개수
    private int pageSize;         // 화면 하단에 출력할 페이지 사이즈

    private Pagination pagination;


    public ArticlePage() {
        this.page = 1;
        this.recordSize = 10;
        this.pageSize = 10;
    }

    public int getOffset() {
        return (page - 1) * recordSize;
    }


    public int getPage() {
        return page;
    }

    public void setPage(int page) {
        this.page = page;
    }

    public int getRecordSize() {
        return recordSize;
    }

    public void setRecordSize(int recordSize) {
        this.recordSize = recordSize;
    }

    public int getPageSize() {
        return pageSize;
    }

    public void setPageSize(int pageSize) {
        this.pageSize = pageSize;
    }

    public String getBoardId() {
        return boardId;
    }

    public void setBoardId(String boardId) {
        this.boardId = boardId;
    }

    public String getSearchCategory() {
        return searchCategory;
    }

    public void setSearchCategory(String searchCategory) {
        this.searchCategory = searchCategory;
    }

    public String getSearchColumn() {
        return searchColumn;
    }

    public void setSearchColumn(String searchColumn) {
        this.searchColumn = searchColumn;
    }

    public String getSearchContent() {
        return SearchContent;
    }

    public void setSearchContent(String searchContent) {
        SearchContent = searchContent;
    }

    public String getAnonymousActive() {
        return anonymousActive;
    }

    public void setAnonymousActive(String anonymousActive) {
        this.anonymousActive = anonymousActive;
    }

    public Pagination getPagination() {
        return pagination;
    }

    public void setPagination(Pagination pagination) {
        this.pagination = pagination;
    }
}