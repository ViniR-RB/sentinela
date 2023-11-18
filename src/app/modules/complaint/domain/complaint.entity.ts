export default class ComplaintEntity {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public longitude: string,
    public latitude: string,
    public createdAt: string,
    public status: string,
    public image: string,
    public userId: string,
    public organId: string,
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.longitude = longitude;
    this.latitude = latitude;
    this.createdAt = createdAt;
    this.status = status;
    this.image = image;
    this.userId = userId;
    this.organId = organId;
  }
}
