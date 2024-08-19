package egovframework.com.devjitsu.hp.board.util;

public class ArticlePage {

    private String boardId;
    private String boardType;
    private String searchCategory;
    private String searchInput;
    private String searchColumn;
    private String SearchContent;
    private String anonymousActive;
    private String publicClass;
    private String selectedDate;

    private String empName;

    private String suggestionType;
    private String status;
    private String afStatus;
    private String startDt;
    private String endDt;
    private String requestType;

    private int page;             // 현재 페이지 번호
    private int recordSize;       // 페이지당 출력할 데이터 개수
    private int pageSize;         // 화면 하단에 출력할 페이지 사이즈

    private Pagination pagination;

    public ArticlePage() {
        this.page = 1;
        this.recordSize = 10;
        this.pageSize = 10;
    }

    public String getBoardType() {
        return boardType;
    }

    public void setBoardType(String boardType) {
        this.boardType = boardType;
    }

    public String getPublicClass() {return publicClass;}

    public void setPublicClass(String publicClass) {
        this.publicClass = publicClass;
    }

    public String getSelectedDate() {
        return selectedDate;
    }

    public void setSelectedDate(String selectedDate) {
        this.selectedDate = selectedDate;
    }

    public String getRequestType() {
        return requestType;
    }

    public void setRequestType(String requestType) {
        this.requestType = requestType;
    }

    public String getSuggestionType() {
        return suggestionType;
    }

    public void setSuggestionType(String suggestionType) {
        this.suggestionType = suggestionType;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getStartDt() {
        return startDt;
    }

    public void setStartDt(String startDt) {
        this.startDt = startDt;
    }

    public String getEndDt() {
        return endDt;
    }

    public void setEndDt(String endDt) {
        this.endDt = endDt;
    }

    public int getOffset() {return (page - 1) * recordSize;}
    public int getPage() {return page;}
    public void setPage(int page) {this.page = page;}
    public int getRecordSize() {return recordSize;}
    public void setRecordSize(int recordSize) {this.recordSize = recordSize;}
    public int getPageSize() {return pageSize;}
    public void setPageSize(int pageSize) {this.pageSize = pageSize;}
    public String getBoardId() {return boardId;}
    public void setBoardId(String boardId) {this.boardId = boardId;}
    public String getSearchCategory() {return searchCategory;}
    public String getSearchInput() { return searchInput; }
    public void setSearchCategory(String searchCategory) {this.searchCategory = searchCategory;}
    public void setSearchInput(String searchInput) {this.searchInput = searchInput;}
    public String getSearchColumn() {return searchColumn;}
    public void setSearchColumn(String searchColumn) {this.searchColumn = searchColumn;}
    public String getSearchContent() {return SearchContent;}
    public void setSearchContent(String searchContent) {SearchContent = searchContent;}
    public String getAnonymousActive() {return anonymousActive;}
    public void setAnonymousActive(String anonymousActive) {this.anonymousActive = anonymousActive;}
    public Pagination getPagination() {return pagination;}
    public void setPagination(Pagination pagination) {this.pagination = pagination;}


    public String getEmpName() {
        return empName;
    }

    public void setEmpName(String empName) {
        this.empName = empName;
    }

    public String getAfStatus() {
        return afStatus;
    }

    public void setAfStatus(String afStatus) {
        this.afStatus = afStatus;
    }
}