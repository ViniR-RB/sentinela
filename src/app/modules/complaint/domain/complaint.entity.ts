export default class ComplaintEntity {
  constructor(
    public id: string,
    public description: string,
    public longitude: string,
    public latitude: string,
    public createdAt: string,
    public status: string,
    public image: string,
  ) {
    this.id = id;
    this.description = description;
    this.longitude = longitude;
    this.latitude = latitude;
    this.createdAt = createdAt;
    this.status = status;
    this.image = image;
  }
}
